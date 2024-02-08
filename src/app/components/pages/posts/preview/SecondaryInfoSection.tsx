'use client';

import Image from "next/image";
import { useFilterStore } from "@/store/filter/filter.store";
import { Rating, VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostsByCategory } from "@/actions/posts/post.actions";

type PostSecondaryInfoProps = {
    post: Post;
}

export const SecondaryInformationSection = ({ post }: PostSecondaryInfoProps) => {
    const t = useLanguage();
    const { category } = useFilterStore();
    const router = useRouter();

    const { user, isLoaded } = useUser();

    const { vehicleMakes, vehicleModels } = useVehicleStore();

    const { information } = post;

    const { isLoading, data: recommendedPosts } = useQuery({
        queryKey: ['getPostsByCategory'],
        queryFn: async () => {
            return await getPostsByCategory(category) as Post[];
        }
    });

    const CommentSection = () => {
        return (
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`font-medium text-primary`}>{t.post.labels.description}</span>
                <span className={`text-primary`}>{post.information.description}</span>
            </div>
        );
    }

    const VehicleSpecs = () => {
        return (
            'vehicleData' in information && (
                <div className={`flex flex-col gap-[0.8rem]`}>
                    <span className={`text-primary text-base full_hd:text-base_2xl font-medium`}>{t.post.labels.specifications}</span>
                    {Object.keys(information.vehicleData.ratingByAuthor)?.map((value, index) => (
                        <div className={`flex flex-col gap-[0.88rem]`} key={`v_spec_${index}`}>
                            <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.rating[VehicleObj.getRatingByIndex(Number(value)) as keyof typeof t.vehicleInfo.rating]}</span>

                            <div className={`flex gap-[0.63rem]`}>
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <div className={`w-full h-[0.625rem] full_hd:h-[0.813rem] rounded-[0.125rem] ${information.vehicleData.ratingByAuthor[Number(value) as Rating] > i ? `bg-highlight` : `bg-border`}`} key={`v_rating_${i}`}></div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )
        );
    }

    const VehiclePostCard = ({ postData }: { postData: Post }) => {
        if (postData.id === post.id) return null; // Do not display the same post

        const RedirectToPost = () => {
            router.push(`/posts/${postData.slug}`);
        }

        return (
            <div className={`w-full flex flex-col bg-highlight_secondary hover:cursor-pointer`} onClick={RedirectToPost}>
                <div className={`h-[10rem] rounded-t-[0.1875rem]`}>
                    <Image
                        src={postData.images.find(img => img.isPrimary)?.url ?? postData.images[0].url}
                        alt={`Image`}
                        width={1920}
                        height={1080}
                        className={`w-full h-full object-cover rounded-t-[0.1875rem]`}
                    />
                </div>
                <div className={`flex justify-between py-[1.05rem] px-[1.20rem] text-primary text-sm full_hd:text-sm_2xl`}>
                    {vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 && (
                        <div className={`flex flex-col gap-[0.5rem]`}>
                            <div className={`flex gap-[0.3rem]`}>
                                {'vehicleData' in postData.information ? (
                                    <>
                                        <span className={`font-medium`}>{vehicleMakes.find(make => 'vehicleData' in postData.information && make.id === postData.information.vehicleData.make)?.make}</span>
                                        <span className={`font-medium`}>{Object.values(vehicleModels[postData.information.vehicleData.make]).find(model => 'vehicleData' in postData.information && model.id === postData.information.vehicleData.model)?.model}</span>
                                        <span className={`font-medium`}>{postData.information.vehicleData.year}</span>
                                    </>
                                ) : (
                                    <span className={`font-medium`}>{postData.information.title}</span>
                                )}
                            </div>
                            <div className={`flex gap-[0.3rem] text-sm full_hd:text-sm_2xl text-[#FFF] items-center w-full`}>
                                <span className={`px-[0.5rem] py-[0.2rem] bg-primary rounded-[0.1875rem]`}>{postData.information.location.country}</span>
                                <span className={`px-[0.5rem] py-[0.2rem] bg-primary rounded-[0.1875rem]`}>{postData.information.location.city}</span>
                            </div>
                        </div>
                    )}
                    <div className={`flex flex-col items-end h-full justify-between`}>
                        <Heart className={`${isLoaded && user && postData.statistics.times_liked.includes(user.id) ? `text-highlight` : `text-placeholder_secondary`}`} />
                        <span className={`text-highlight`}>{postData.information.price.toLocaleString()}&euro;</span>
                    </div>
                </div>
            </div>
        )
    }

    const MorePosts = () => {
        return (
            <div className={`flex flex-col gap-[0.8rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl font-medium`}>{t.post.labels.more_recommended}</span>
                <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between pt-[0.8rem]`}>
                    {recommendedPosts && recommendedPosts.map((post, idx) => (
                        <VehiclePostCard postData={post} key={`vehicle_post_card_${idx}`} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            {post.information.description && (
                <>
                    <CommentSection />
                    <hr className={`text-border bg-border`} />
                </>
            )}
            <VehicleSpecs />
            {!isLoading && recommendedPosts && recommendedPosts.length > 0 && (
                <>
                    <hr className={`text-border bg-border`} />
                    <MorePosts />
                </>
            )}
        </div>
    );
}