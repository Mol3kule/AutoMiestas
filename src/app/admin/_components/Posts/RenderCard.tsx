"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { VehicleObj, getVehicleDataProps } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { PostVehicle } from "@/types/post.type";
import { getDateFromTimestampWithTime } from "@/lib/getDate";
import { getPostUrl } from "@/lib/getPostUrl";
import { useRouter } from "next/navigation";

type PostStatus = "active" | "inactive";

type PostCardProps = {
    children: React.ReactNode;
    post: PostVehicle;
};

const PostCard = ({ children, post }: PostCardProps) => {
    const { id, images, information: { vehicleData }, status: { isPublished } } = post;
    const { vehicleMakes, vehicleModels } = useVehicleStore();

    const [useVehicleData, setVehicleData] = useState<getVehicleDataProps>(null!);
    const t = useLanguage();
    const router = useRouter();

    const PostStatuses: { [key in PostStatus]: string } = {
        active: "Aktyvus",
        inactive: "Neaktyvus"
    };

    useEffect(() => {
        if (!Object.values(vehicleModels).length) return;

        const getVehicleData = VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
        setVehicleData(getVehicleData);
    }, [vehicleModels]);

    const RedirectToPost = () => {
        if (!useVehicleData) return;
        const url = getPostUrl({ vehicleMakes, vehicleModels, post });
        router.push(url);
    };

    return (
        <div className={`flex flex-col gap-[1.25rem] px-[1.75rem] py-[1.56rem] bg-highlight_secondary rounded-[0.1875rem]`}>
            <div className={`w-max px-[0.62rem] py-[0.25rem] rounded-[0.1875rem] ${isPublished ? `bg-[rgba(92,131,116,0.08)] text-highlight` : `bg-[rgba(255,168,0,0.08)] text-error_third`}`}>
                <span className={`text-base full_hd:text-base_2xl`}>{isPublished ? PostStatuses.active : PostStatuses.inactive}</span>
            </div>
            <div className={`flex gap-[1.25rem] items-center`}>
                <div className={`w-[3.125rem] h-[3.125rem] rounded-full`}>
                    {post.images && (
                        <Image
                            src={images.find(img => img.isPrimary)?.url || images[0].url}
                            alt="post_image"
                            className={`rounded-full w-full h-full object-cover`}
                            width={1920}
                            height={1080}
                        />
                    )}
                </div>
                {useVehicleData && (
                    <div className={`flex flex-col text-primary text-base full_hd:text-base_2xl hover:cursor-pointer hover:opacity-60 duration-500`} onClick={RedirectToPost}>
                        <span>{useVehicleData.make?.make} {useVehicleData.model?.model}</span>
                        <span>{t.general.id}: #{id}</span>
                    </div>
                )}
            </div>
            <div className={`text-highlight text-base full_hd:text-base_2xl flex flex-col`}>
                <span>{t.my_posts.post_uploaded} {getDateFromTimestampWithTime(post.periods.time_created)}</span>
                <span>{t.my_posts.post_edited} {getDateFromTimestampWithTime(post.periods.time_updated)}</span>
            </div>
            {children}
        </div>
    )
};

export const RenderActivePostCard = ({ post }: { post: PostVehicle }) => {
    return (
        <PostCard post={post}>
            <div className={`flex gap-[0.87rem]`}>
                <RenderActionButton className={`bg-highlight text-[#FFF]`}>Sustabdyti skelbimą</RenderActionButton>
                <RenderActionButton className={`bg-error_secondary text-[#FFF]`}>Pašalinti</RenderActionButton>
            </div>
        </PostCard>
    )
};
export const RenderInactivePostCard = ({ post }: { post: PostVehicle }) => {
    return (
        <PostCard post={post}>
            <div className={`flex gap-[0.87rem]`}>
                <RenderActionButton className={`bg-highlight text-[#FFF]`}>Sustabdyti skelbimą</RenderActionButton>
                <RenderActionButton className={`bg-error_secondary text-[#FFF]`}>Pašalinti</RenderActionButton>
            </div>
        </PostCard>
    )
};

const RenderActionButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <button className={`px-[0.62rem] py-[0.5rem] rounded-[0.1875rem] ${className}`}>{children}</button>
    )
};