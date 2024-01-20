'use client';

import { PostVehicle } from "@/types/post.type";
import { GeneralInformationSection } from "./GeneralInformationSection";
import { AuthorContactsSection } from "./AuthorContactsSection";

export const PostGeneralInfo = ({ post, phoneNumber }: { post: PostVehicle, phoneNumber: string }) => {
    return (
        <div className={`flex flex-col gap-[1.25rem] laptop:w-[30%]`}>
            <GeneralInformationSection post={post} />
            <AuthorContactsSection post={post} phoneNumber={phoneNumber} />
        </div>
    )
}