"use client";

import { getFavoritePosts } from "@/actions/posts/post.actions";
import { PaginationWrapper } from "@/components/hooks/pagination.hook";
import { VehiclePostCard } from "@/components/pages/home/cards/vehicle";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ItemsDisplayCount = 9;
export const FavoritePostsPage = () => {
    const searchParamsString = useSearchParams();
    const [currentPage, setCurrentPage] = useState<number>(searchParamsString.get('page') ? Number(searchParamsString.get('page')) : 1); // searchParams.page ? Number(searchParams.page) : 1

    useEffect(() => {
        setCurrentPage(searchParamsString.get('page') ? Number(searchParamsString.get('page')) : 1)
    }, [searchParamsString]);

    const { isLoading, data: posts } = useQuery({
        queryKey: ["getFavoritePosts"],
        queryFn: async () => {
            return await getFavoritePosts();
        }
    });

    const ItemsOffset = (currentPage - 1) * ItemsDisplayCount;
    const ItemsToRender = posts?.slice(ItemsOffset, ItemsOffset + ItemsDisplayCount) ?? [];

    return (
        ItemsToRender.length > 0 ? (
            <>
                <div className={`flex flex-col gap-[0.5rem]`}>
                    <span className={`text-base full_hd:text-base_2xl text-primary`}>Įsiminti skelbimai</span>
                    <span className={`text-base full_hd:text-base_2xl text-placeholder_secondary`}>Visus įsimintus skelbimus galite matyti šiame puslapyje</span>
                </div>
                <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                    {ItemsToRender?.map((post, idx) => (
                        <VehiclePostCard postData={post as Post} key={`vehicle_post_card_${idx}`} />
                    ))}
                </div>
                {ItemsToRender.length > 0 && posts && (
                    <div className={`flex items-end justify-center w-full flex-1`}>
                        <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.length / ItemsDisplayCount)} />
                    </div>
                )}
            </>
        ) : (
            <div className={`flex items-center justify-center flex-1`}>
                <span className={`text-base full_hd:text-base_2xl text-placeholder_secondary`}>Atsiprašome, bet jūs neturite patinkančių skelbimų</span>
            </div>
        )
    )
};