'use client';

import { Post } from "@/types/post.type";
import { GeneralInformationSection } from "./GeneralInformationSection";
import { AuthorContactsSection } from "./AuthorContactsSection";

export const PostGeneralInfo = ({ post }: { post: Post }) => {
    return (
        <div className={`flex flex-col gap-[1.25rem] laptop:w-[30%]`}>
            <GeneralInformationSection post={post} />
            <AuthorContactsSection />
        </div>
    )
}