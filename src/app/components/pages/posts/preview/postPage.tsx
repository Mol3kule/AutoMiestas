'use client';

import { Post } from "@/types/post.type";
import { PostGeneralInfo } from "./PostGeneralInfo";
import { PostSecondaryInfo } from "./PostSecondaryInfo";
import { useImgPreviewStore } from "@/store/image_preview/imagePreview.store";
import { ImagePreviewModal } from "../../../modals/imagePreview";

type PostPageProps = {
    post: Post;
}

export const PostPage = ({ post }: PostPageProps) => {
    const { isPreviewActive } = useImgPreviewStore();

    return (
        <div>
            <div className={`flex flex-col laptop:flex-row gap-[2.19rem] laptop:hidden`}>
                <PostSecondaryInfo post={post} />
                <PostGeneralInfo post={post} />
            </div>
            <div className={`hidden laptop:flex laptop:flex-row gap-[2.19rem]`}>
                <PostGeneralInfo post={post} />
                <PostSecondaryInfo post={post} />
            </div>
            {isPreviewActive && (
                <ImagePreviewModal images={post.images} />
            )}
        </div>
    )
}