"use client";

import { PaginationWrapper } from "@/app/components/hooks/pagination.hook";
import { getUrlParams } from "@/lib/getUrlParams";
import { Post } from "@/types/post.type";
import { useUser } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RenderActivePostCard, RenderInactivePostCard } from "./RenderCard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/app/components/spinner";
import { getPosts } from "@/actions/posts/post.actions";

type PostTypes = {
    active: Post[];
    inactive: Post[];
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

    const { isLoading } = useQuery({
        queryKey: ["getPosts"],
        queryFn: async () => {
            const { active, inactive } = await getPosts();
            setPosts({ active, inactive });
            return true;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const isCentered = isLoading || (params.includes("active") && !posts.active.length) || (params.includes("inactive") && !posts.inactive.length);

    return (
        <div className={`flex-1 ${isCentered ? `flex items-center justify-center` : ``}`}>
            {!isLoading ? (
                <>
                    {params?.includes("active") && (
                        posts.active.length > 0 ? (
                            <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                                {ActivePosts.map((post, idx) => (
                                    <RenderActivePostCard post={post} key={`admin_active_post_${idx}`} />
                                ))}
                                <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                                    <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.active.length / ItemsDisplayCount)} />
                                </div>
                            </div>
                        ) : (
                            <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Atsiprašome, skelbimų nerasta.</span>
                        )
                    )}
                    {params?.includes("inactive") && (
                        posts.inactive.length > 0 ? (
                            <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                                {InactivePosts.map((post, idx) => (
                                    <RenderInactivePostCard post={post} key={`admin_inactive_post_${idx}`} />
                                ))}
                                <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                                    <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.inactive.length / ItemsDisplayCount)} />
                                </div>
                            </div>
                        ) : (
                            <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Atsiprašome, skelbimų nerasta.</span>
                        )
                    )}
                </>
            ) : (
                <Spinner />
            )}
        </div>
    )
};