'use client';

import { Post } from "@/types/post.type";
import Image from "next/image";
import { RenderLocationItem } from "../../posts/preview/GeneralInformationSection";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export const VehiclePostCard = ({ postData, idx }: { postData: Post, idx: number }) => {
    const router = useRouter();

    const HandleLikeClick = (e: any) => {
        const { target } = e;
        // If post is liked, then remove animation
        // If post is not liked, then add animation
        target.classList.toggle(`animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)]`);
    }

    const { id, images, information, periods } = postData;

    const HandlePostClick = () => {
        router.push(`/posts/${id}/${information.vehicleData.make}-${information.vehicleData.model}-${information.vehicleData.year}/${periods.time_created}`);
    }

    return (
        <button className={`w-[18.125rem] rounded-[0.1875rem] bg-placeholder`} onClick={HandlePostClick}>
            <div className={`w-full relative`}>
                <Heart onClick={(e) => HandleLikeClick(e)} className={`absolute bottom-[1rem] left-[1rem] w-[1.125rem] h-[1.125rem] text-placeholder_secondary hover:cursor-pointer`} />
                <Image
                    src={images.find(img => img.isPrimary)?.url!}
                    alt="Vehicle card"
                    className={`rounded-[0.1875rem] w-full h-full object-cover`}
                    width={1920}
                    height={1080}
                />
            </div>
            <div className={`flex flex-col gap-[1rem] flex-1 px-[1.56rem] py-[1.31rem]`}>
                <div className={`flex gap-[0.6rem]`}>
                    <span className={`text-primary font-medium text-base full_hd:text-base_2xl`}>{postData.information.vehicleData.make} {postData.information.vehicleData.model}</span>
                    <span className={`text-highlight text-base full_hd:text-base_2xl`}>{Number(postData.information.price).toLocaleString()}&euro;</span>
                </div>
                <div className={`flex gap-[0.6rem]`}>
                    <RenderLocationItem>{postData.information.location.city}</RenderLocationItem>
                    <RenderLocationItem>{postData.information.location.country}</RenderLocationItem>
                </div>
            </div>
        </button>
    )
}