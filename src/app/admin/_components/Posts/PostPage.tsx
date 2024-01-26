"use client";

import { PaginationWrapper } from "@/app/components/hooks/pagination.hook";
import { getUrlParams } from "@/lib/getUrlParams";
import { PostVehicle } from "@/types/post.type";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RenderActivePostCard, RenderInactivePostCard } from "./RenderCard";

type PostTypes = {
    active: PostVehicle[];
    inactive: PostVehicle[];
}

const ItemsDisplayCount = 9;
export const PostAdminPage = () => {
    const { user, isLoaded } = useUser();

    if (!user && isLoaded) {
        redirect("/sign-in");
    }

    const searchParamsString = useSearchParams();
    const params = getUrlParams(searchParamsString);
    const [posts, setPosts] = useState<PostTypes>({ active: [], inactive: [] });
    const [currentPage, setCurrentPage] = useState<number>(1);

    const ItemsOffset = (currentPage - 1) * ItemsDisplayCount;
    const ActivePosts = posts.active?.slice(ItemsOffset, ItemsOffset + ItemsDisplayCount);
    const InactivePosts = posts.inactive?.slice(ItemsOffset, ItemsOffset + ItemsDisplayCount);

    useEffect(() => {
        axios.get(`${process.env.defaultApiEndpoint}/api/posts/getPosts`).then(res => {
            const { status, active, inactive } = res.data;

            if (status === 200) {
                setPosts({ active, inactive });
            }
        });
    }, []);

    return (
        <div>
            {params?.includes("active") && posts.active.length > 0 && (
                <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                    {ActivePosts.map((post, idx) => (
                        <RenderActivePostCard post={post} key={`admin_active_post_${idx}`} />
                    ))}
                    <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                        <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.active.length / ItemsDisplayCount)} />
                    </div>
                </div>
            )}
            {params?.includes("inactive") && posts.inactive.length > 0 && (
                <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                    {InactivePosts.map((post, idx) => (
                        <RenderInactivePostCard post={post} key={`admin_inactive_post_${idx}`} />
                    ))}
                    <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                        <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.inactive.length / ItemsDisplayCount)} />
                    </div>
                </div>
            )}
        </div>
    )
};