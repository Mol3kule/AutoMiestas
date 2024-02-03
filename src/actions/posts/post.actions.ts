"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/actions/users/user.actions";
import { MailDataType } from "@/types/mailbox/mailbox.type";
import { PostStatus, Post } from "@/types/post.type";
import { Categories } from "@/classes/PostCategories";
import { uploadImages } from "@/actions/s3/s3.actions";
import { VehicleObj } from "@/classes/Vehicle";
import { getSelectedVehicle } from "../vehicles/vehicle.actions";
import { createCheckoutSession } from "../stripe/stripe.actions";

export const getPosts = async () => {
    const posts = await prisma.posts.findMany();

    const active = await Promise.all(posts.filter((post) => {
        const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

        return isPublished && !isAttentionRequired && !isEditedAfterAttentionRequired;
    }));

    const inactive = await Promise.all(posts.filter((post) => {
        const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

        return !isPublished && isAttentionRequired && isEditedAfterAttentionRequired;
    }));

    return { active, inactive } as { active: Post[], inactive: Post[] };
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

export const StopPost = async (postId: number, reason: MailDataType) => {
    const { userId } = auth();

    if (!userId) return { status: 401, message: "Unauthorized" };

    const { status, data: userData, message } = await getUserById(userId);

    if (status !== 200 || !userData) return { status, message };

    if (userData?.admin_rank <= 0) return { status: 403, message: "Forbidden" };

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

    return await prisma.mailbox.create({
        data: {
            authorId: userId,
            receiverId: updatedPost.authorId,
            type: 0,
            data: reason
        }
    })
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
