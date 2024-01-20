'use client';

import { PostVehicle } from "@/types/post.type"
import { PostImagesSection } from "./ImagesSection";
import { SecondaryInformationSection } from "./SecondaryInfoSection";

export const PostSecondaryInfo = ({ post }: { post: PostVehicle }) => {
    return (
        <div className={`flex flex-col gap-[1.25rem] w-full`}>
            <PostImagesSection images={post.images} />
            <hr className={`text-border bg-border`} />
            <SecondaryInformationSection post={post} />
        </div>
    )
}