'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFilterStore } from "@/store/filter/filter.store";
import { Rating, VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { PostVehicle } from "@/types/post.type";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type PostSecondaryInfoProps = {
    post: PostVehicle;
}

export const SecondaryInformationSection = ({ post }: PostSecondaryInfoProps) => {
    const t = useLanguage();
    const { category } = useFilterStore();
    const [recommendedPosts, setRecommendedPosts] = useState<PostVehicle[]>([]);
    const router = useRouter();

    const { user, isLoaded } = useUser();

    const { vehicleMakes, vehicleModels } = useVehicleStore();

    useEffect(() => {
        axios.post(`${process.env.defaultApiEndpoint}/api/posts/getPostsByCategory`, { category }).then(res => {
            const { status, data } = res.data;

            if (status === 200) {
                setRecommendedPosts(data);
            }
        });
    }, []);

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
            <div className={`flex flex-col gap-[0.8rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl font-medium`}>{t.post.labels.specifications}</span>
                {Object.keys(post.ratingByAuthor)?.map((value, index) => (
                    <div className={`flex flex-col gap-[0.88rem]`} key={`v_spec_${index}`}>
                        <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.rating[VehicleObj.getRatingByIndex(Number(value)) as keyof typeof t.vehicleInfo.rating]}</span>

                        <div className={`flex gap-[0.63rem]`}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div className={`w-full h-[0.625rem] full_hd:h-[0.813rem] rounded-[0.125rem] ${post.ratingByAuthor[Number(value) as Rating] > i ? `bg-highlight` : `bg-border`}`} key={`v_rating_${i}`}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    const VehiclePostCard = ({ postData }: { postData: PostVehicle }) => {
        if (postData.id === post.id) return null; // Do not display the same post

        const { id, information: { vehicleData }, periods } = postData;

        const RedirectToPost = () => {
            const make = encodeURI(vehicleMakes.find(make => make.id === vehicleData.make)?.make!);
            const model = encodeURI(Object.values(vehicleModels[vehicleData.make]).find(model => model.id === vehicleData.model)?.model!);
            const newUrl = encodeURI(`/posts/${id}/${make}-${model}-${vehicleData.year}/${periods.time_created}`);

            router.push(newUrl);
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
                                <span className={`font-medium`}>{vehicleMakes.find(make => make.id === postData.information.vehicleData.make)?.make}</span>
                                <span className={`font-medium`}>{Object.values(vehicleModels[postData.information.vehicleData.make]).find(model => model.id === postData.information.vehicleData.model)?.model}</span>
                                <span className={`font-medium`}>{postData.information.vehicleData.year}</span>
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
                    {recommendedPosts.map((post, idx) => (
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
            <hr className={`text-border bg-border`} />
            {recommendedPosts.length > 0 && (
                <MorePosts />
            )}
        </div>
    );
}