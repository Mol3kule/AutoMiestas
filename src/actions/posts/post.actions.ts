"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/actions/users/user.actions";
import { MailType } from "@/types/mailbox/mailbox.type";
import { PostStatus, Post, PostBoosts, PostStatistics } from "@/types/post.type";
import { uploadImages } from "@/actions/s3/s3.actions";
import { VehicleObj } from "@/classes/Vehicle";
import { getSelectedVehicle } from "../vehicles/vehicle.actions";
import { createCheckoutSession, getSubscription } from "../stripe/stripe.actions";

export const getPostsByUserId = async (userId: string) => {
    return await prisma.posts.findMany({
        where: {
            authorId: userId
        }
    });
}

export const getPostsByCategory = async (category: number) => {
    return await prisma.posts.findMany({
        where: {
            status: {
                path: '$.isPublished',
                equals: true
            },
            category: category
        }
    });
};

export const getPosts = async () => {
    try {
        const posts = await prisma.posts.findMany();

        const active = await Promise.all(posts.filter((post) => {
            const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

            return isPublished && !isAttentionRequired && !isEditedAfterAttentionRequired;
        })) as Post[];

        const inactive = await Promise.all(posts.filter((post) => {
            const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

            return !isPublished && isAttentionRequired && isEditedAfterAttentionRequired && post.isSubscriptionActive;
        })) as Post[];

        const drafts = await Promise.all(posts.filter((post) => {
            return !post.isSubscriptionActive;
        })) as Post[];

        return { active, inactive, drafts };
    } catch (error) {
        console.log(`[getPosts]: ${error}`);
        return { active: [], inactive: [], drafts: [] };
    }
};

export const getPostById = async (postId: number) => {
    return await prisma.posts.findUnique({
        where: {
            id: postId
        }
    });
};

export const getPostBySlug = async (slug: string) => {
    return await prisma.posts.findFirst({
        where: {
            slug
        }
    });
};

export const ApprovePost = async (postId: number) => {
    return await prisma.posts.update({
        where: {
            id: postId
        },
        data: {
            status: {
                isPublished: true,
                isAttentionRequired: false,
                isEditedAfterAttentionRequired: false
            }
        }
    });
};

export const StopPost = async (postId: number, reason: { type: Number, errors: Number[] }) => {
    const { userId } = auth();
    if (!userId) return { status: 401, error: 'Unauthorized' };

    const { status, data: userData } = await getUserById(userId);
    if (status !== 200 || !userData) return { status, error: 'Unauthorized' };

    if (userData?.admin_rank <= 0) return { status: 401, error: 'Unauthorized' };

    const post = await getPostById(postId);
    if (!post) return { status: 400, error: 'Bad Request' };

    const { isPublished } = post.status as PostStatus;

    if (!isPublished) {
        return { status: 400, error: 'Post is not active' };
    }

    const updatedPost = await prisma.posts.update({
        where: {
            id: postId
        },
        data: {
            status: {
                isPublished: false,
                isAttentionRequired: true,
                isEditedAfterAttentionRequired: false
            }
        },
        select: {
            authorId: true
        }
    });

    await prisma.mailbox.create({
        data: {
            authorId: userId,
            receiverId: updatedPost.authorId,
            type: MailType.Info,
            data: JSON.stringify(reason)
        }
    });

    return { status: 200 };
}

export const CreatePost = async (data: any) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, error: 'Unauthorized' };
        }

        const {
            category, makeId, modelId, modelYear, bodyType, mileage, mileage_type, fuelType,
            drivetrain, transmission, sw_side, condition, price, technical_inspection_due,
            vin, sdk, description, primaryImg, countryId, cityId, specifications,
            ccm, power, power_type, title, partNumber, formDataImages, priceId
        } = data;

        const vehicleData = {
            make: makeId,
            model: modelId,
            year: modelYear,
            body_type: bodyType,
            condition,
            fuel_type: fuelType,
            drive_train: drivetrain,
            transmission,
            mileage,
            mileage_type,
            technical_inspection_due_to: technical_inspection_due,
            sdk,
            sw_side,
            vin,
            ccm,
            power,
            power_type,
            ratingByAuthor: specifications,
        }
        const itemData = { partNumber, condition };

        const isVehicleCategory = Object.keys(VehicleObj.getAllTypes()).includes(category.toString());
        const { slug, timestamp: currentTimestamp } = await generateSlug({ isVehicleCategory, category, makeId, modelId, modelYear, title });

        const postData = {
            information: {
                ...isVehicleCategory ? { vehicleData } : { itemData },
                ...isVehicleCategory ? {} : title,
                location: { cityId, countryId },
                description,
                price
            },
            images: [],
            statistics: {
                times_liked: [],
                times_viewed: []
            },
            boosts: {
                time_created: null,
            },
            periods: {
                time_created: currentTimestamp,
                time_updated: currentTimestamp
            },
            category: category,
            slug
        }

        const createResponse = await prisma.posts.create({
            data: {
                authorRelation: { connect: { userId } },
                ...postData,
                subscriptionId: null,
                status: {
                    isPublished: false,
                    isAttentionRequired: true,
                    isEditedAfterAttentionRequired: true,
                },
                isSubscriptionActive: false
            },
        });

        if (!createResponse) return { status: 500, error: createResponse };

        const { status, data: imageUrls, message } = await uploadImages(formDataImages);
        if (status !== 200 || !imageUrls) return { status, error: message };

        const primaryImageFile = formDataImages.get('primary_img');
        await prisma.posts.update({
            where: {
                id: createResponse.id
            },
            data: {
                images: imageUrls.map((img: string) => ({ url: img, isPrimary: img.includes(primaryImageFile.name) }))
            }
        });

        const checkoutResponse = await createCheckoutSession(priceId, createResponse.id);

        if (checkoutResponse.status !== 200) return checkoutResponse;

        return { status: 200, url: checkoutResponse.url };
    } catch (error) {
        console.log(`[CreatePost]: ${error}`);
        return { status: 500, error };
    }
};

export const DeletePost = async (postId: number) => { };

export const getPostSlug = async (postId: number) => {
    const post = await prisma.posts.findUnique({
        where: {
            id: postId
        }
    });

    return post?.slug;
};

const generateSlug = async ({ isVehicleCategory, category, makeId, modelId, modelYear, title }: { isVehicleCategory: boolean, category: number, makeId: number, modelId: number, modelYear: number, title: string }): Promise<{ slug: string, timestamp: number }> => {
    const currentTimestamp = Date.now(); // Provide a default value for currentTimestamp
    let fetchedVehicleData = isVehicleCategory ? await getSelectedVehicle(makeId, modelId) : { make: null, model: null };

    const slug = isVehicleCategory
        ? `${fetchedVehicleData.make?.make.replace(/ /g, '-')}-${fetchedVehicleData.model?.model.replace(/ /g, '-')}-${modelYear}-${currentTimestamp}`
        : `${title.replace(/ /g, '-')}-${currentTimestamp}`;

    const isExistingPostWithSlug = await prisma.posts.findFirst({
        where: {
            slug
        }
    });

    if (isExistingPostWithSlug) {
        return generateSlug({ isVehicleCategory, category, makeId, modelId, modelYear, title });
    }

    return { slug, timestamp: currentTimestamp };
}

export const boostPost = async (postId: number) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, translation: "unauthorized" };
        }

        if (typeof postId !== 'number') {
            return { status: 400, translation: "bad_request" };
        }

        const post = await getPostById(postId);

        if (!post) {
            return { status: 400, translation: "bad_request" };
        }

        const { isPublished } = post.status as PostStatus;
        const { time_created } = post.boosts as PostBoosts;

        if (!isPublished) {
            return { status: 400, translation: "post_not_active" };
        }

        const { status: getSubStatus, product, subscription, translation } = await getSubscription(post.subscriptionId!);

        if (getSubStatus !== 200 || !product) return { status: getSubStatus, translation };

        const { metadata } = product;

        const nextBoostAtTimestamp = new Date(Number(time_created)).setDate(new Date(Number(time_created)).getDate() + Number(metadata.boost_timeout));

        if (!time_created || nextBoostAtTimestamp < Date.now()) {
            await prisma.posts.update({
                where: {
                    id: post.id
                },
                data: {
                    boosts: {
                        time_created: Date.now(),
                    }
                }
            });
        } else {
            return { status: 400, translation: "post_boost_cooldown" };
        }

        return { status: 200 };
    } catch (error) {
        console.log(`[boostPost]: ${error}`);
        return { status: 500, error };
    }
};

export const increasePostViewById = async (postId: number) => {
    if (!postId) {
        return { status: 400, error: "Bad request" };
    }

    const { userId } = auth();

    if (userId) {
        const post = await prisma.posts.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            return { status: 400, error: "Bad Request" };
        }

        const postStatistics = post.statistics as PostStatistics;
        const timesViewed = new Set([...postStatistics.times_viewed]);
        timesViewed.add(userId);

        await prisma.posts.update({
            where: {
                id: postId
            },
            data: {
                statistics: {
                    ...post.statistics as PostStatistics,
                    times_viewed: Array.from(timesViewed)
                }
            }
        });
    }

    return { status: 200 };
};

export const addToFavoritesById = async (postId: number) => {
    const { userId } = auth();

    if (!userId) {
        return { status: 401, translation: "user_not_logged_in" };
    }

    if (typeof postId !== "number") {
        return { status: 400, translation: "request_error" };
    }

    const post = await getPostById(postId);
    if (!post) {
        return { status: 400, translation: "request_error" };
    }

    const stats = post.statistics as PostStatistics;

    if (stats.times_liked.includes(userId)) {
        await prisma.posts.update({
            where: {
                id: postId
            },
            data: {
                statistics: {
                    ...stats,
                    times_liked: stats.times_liked.filter(uId => uId !== userId)
                }
            }
        });
        return { status: 200, translation: "post_disliked" };
    }

    await prisma.posts.update({
        where: {
            id: postId
        },
        data: {
            statistics: {
                ...stats,
                times_liked: [...stats.times_liked, userId]
            }
        }
    });

    return { status: 200, translation: "post_liked" };
};