'use client';

import { PostVehicle } from "@/types/post.type";
import { PostGeneralInfo } from "./PostGeneralInfo";
import { PostSecondaryInfo } from "./PostSecondaryInfo";
import { useImgPreviewStore } from "@/store/image_preview/imagePreview.store";
import { ImagePreviewModal } from "../../../modals/imagePreview";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserType } from "@/types/user.type";

type PostPageProps = {
    post: PostVehicle;
    phoneNumber: string;
}

export const PostPage = ({ post, phoneNumber }: PostPageProps) => {
    const { status } = post;
    const { isPreviewActive } = useImgPreviewStore();

    const [userData, setUserData] = useState<UserType>(null!);

    useEffect(() => {
        axios.get(`${process.env.defaultApiEndpoint}/api/auth/getUser`).then((res) => {
            const { status, data }: { status: number, data: UserType } = res.data;
            if (status === 200) {
                setUserData(data);
            }
        });
    }, []);

    const isAdmin = userData && userData.admin_rank > 0;

    const RenderPage = () => (
        <>
            <div className={`flex flex-col laptop:flex-row gap-[2.19rem] laptop:hidden`}>
                <PostSecondaryInfo post={post} />
                <PostGeneralInfo post={post} phoneNumber={phoneNumber} />
            </div>
            <div className={`hidden laptop:flex laptop:flex-row gap-[2.19rem]`}>
                <PostGeneralInfo post={post} phoneNumber={phoneNumber} />
                <PostSecondaryInfo post={post} />
            </div>
        </>
    );

    return (
        <div className={`flex flex-col justify-center items-center flex-1 gap-[1.25rem]`}>
            {status.isPublished ? (
                <RenderPage />
            ) : (
                <>
                    {isAdmin ? (
                        <RenderPage />
                    ) : (
                        <div className={`flex flex-col`}>
                            <div className={`text-center`}>
                                <span className={`text-primary text-[8rem]`}>404</span>
                            </div>
                            <span className={`text-placeholder_secondary flex items-center justify-center text-base full_hd:text-base_2xl`}>Skelbimas nepasiekiamas</span>
                        </div>
                    )}
                </>
            )}

            {isPreviewActive && (
                <ImagePreviewModal images={post.images} />
            )}
        </div>
    )
}