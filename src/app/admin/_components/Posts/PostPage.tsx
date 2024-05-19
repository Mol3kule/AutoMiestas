"use client";

import { PaginationWrapper } from "@/components/hooks/pagination.hook";
import { getUrlParams } from "@/lib/getUrlParams";
import { Post } from "@/types/post.type";
import { useUser } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RenderActivePostCard, RenderDraftPostCard, RenderInactivePostCard } from "./RenderCard";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
import { getPosts } from "@/actions/posts/post.actions";

const ItemsDisplayCount = 9;
export const PostAdminPage = () => {
    const { user, isLoaded } = useUser();

    if (!user && isLoaded) {
        redirect("/sign-in");
    }

    const searchParamsString = useSearchParams();
    const [params, setParams] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        setParams(getUrlParams(searchParamsString));
    }, [searchParamsString]);

    const { isLoading, data: posts } = useQuery({
        queryKey: ["getAllPosts", { params: params[1] }],
        queryFn: async () => {
            console.log('refreshing posts');
            return await getPosts();
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const ItemsOffset = (currentPage - 1) * ItemsDisplayCount;
    const PostItems = params && params.length === 2 && posts ? posts[params[1] as keyof typeof posts].slice(ItemsOffset, ItemsOffset + ItemsDisplayCount) : [];

    const isCentered = isLoading || !PostItems.length;

    return (
        <div className={`flex flex-col flex-1 ${isCentered ? `flex items-center justify-center` : ``}`}>
            {!isLoading ? (
                <RenderContent currentPage={currentPage} params={params} activeWindow={params[1]} items={PostItems} />
            ) : (
                <Spinner />
            )}
        </div>
    )
};

const RenderContent = ({ currentPage, params, activeWindow, items }: { currentPage: number, params: string[], activeWindow: string, items: Post[] }) => {
    return (
        <>
            {params.includes(activeWindow) && (
                items.length > 0 ? (
                    <>
                        <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                            {items.map((post, idx) => (
                                <div key={`admin_${activeWindow}_post_${idx}`}>
                                    {activeWindow === "active" && (
                                        <RenderActivePostCard post={post} />
                                    )}
                                    {activeWindow === "inactive" && (
                                        <RenderInactivePostCard post={post} />
                                    )}

                                    {activeWindow === "drafts" && (
                                        <RenderDraftPostCard post={post} />
                                    )}
                                </div>

                            ))}
                        </div>
                        <div className={`flex justify-center bottom-[1rem] w-full flex-1 items-end`}>
                            <PaginationWrapper currentPage={currentPage} pages={Math.ceil(items.length / ItemsDisplayCount)} />
                        </div>
                    </>
                ) : (
                    <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Atsiprašome, skelbimų nerasta.</span>
                )
            )}
        </>
    )
}