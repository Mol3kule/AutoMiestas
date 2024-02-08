"use client";

import { useEffect, useState } from "react";
import { VehiclePostCard } from "./cards/vehicle";
import { FilterSelector } from "./filter/filterSelector";
import { Post, PostBoosts } from "@/types/post.type";
import { useFilterStore } from "@/store/filter/filter.store";
import { PaginationWrapper } from "../../hooks/pagination.hook";
import { useQuery } from "@tanstack/react-query";
import { getPostsByCategory } from "@/actions/posts/post.actions";

const ItemsDisplayCount = 9;
export const HomePage = ({ searchParams }: { searchParams: { page?: number } }) => {
    const [currentPage, setCurrentPage] = useState<number>(searchParams.page ? Number(searchParams.page) : 1);
    const { category } = useFilterStore();

    const { isLoading, data: posts } = useQuery({
        queryKey: ["getPostsByCategory", { category }],
        queryFn: async () => {
            return await getPostsByCategory(category);
        }
    })

    const ItemsOffset = (currentPage - 1) * ItemsDisplayCount;

    const SortedItems = posts ? posts?.sort((a, b) => {
        if (!a.boosts || !b.boosts) return 0;
        const aBoosts = a.boosts as PostBoosts;
        const bBoosts = b.boosts as PostBoosts;

        if (!aBoosts.time_created || !bBoosts.time_created) {
            if (!aBoosts.time_created && bBoosts.time_created) return 1;
            if (aBoosts.time_created && !bBoosts.time_created) return -1;
            return 0;
        }

        if (aBoosts.time_created < bBoosts.time_created) return 1;
        if (aBoosts.time_created > bBoosts.time_created) return -1;
        return 0;
    }) : [];
    const ItemsToRender = SortedItems?.slice(ItemsOffset, ItemsOffset + ItemsDisplayCount);

    useEffect(() => {
        setCurrentPage(searchParams.page ? Number(searchParams.page) : 1);
    }, [searchParams]);

    return (
        <div className={`flex flex-col gap-[2.20rem]`}>
            <FilterSelector />
            <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                {ItemsToRender?.map((post, idx) => (
                    <VehiclePostCard postData={post as Post} idx={idx} key={`vehicle_post_card_${idx}`} />
                ))}
            </div>
            {ItemsToRender.length > 0 && posts && (
                <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                    <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.length / ItemsDisplayCount)} />
                </div>
            )}
        </div>
    )
}