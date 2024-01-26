"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { VehiclePostCard } from "./cards/vehicle";
import { FilterSelector } from "./filter/filterSelector";
import { PostVehicle } from "@/types/post.type";
import { useFilterStore } from "@/store/filter/filter.store";
import { PaginationWrapper } from "../../hooks/pagination.hook";

const ItemsDisplayCount = 9;
export const HomePage = ({ searchParams }: { searchParams: { page?: number } }) => {
    const [posts, setPosts] = useState<PostVehicle[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(searchParams.page ? Number(searchParams.page) : 1);
    const { category } = useFilterStore();

    const ItemsOffset = (currentPage - 1) * ItemsDisplayCount;

    const SortedItems = posts?.sort((a, b) => {
        if (!a.boosts.time_created || !b.boosts.time_created) {
            if (!a.boosts.time_created && b.boosts.time_created) return 1;
            if (a.boosts.time_created && !b.boosts.time_created) return -1;
            return 0;
        }
        
        if (a.boosts.time_created < b.boosts.time_created) return 1;
        if (a.boosts.time_created > b.boosts.time_created) return -1;
        return 0;
    });
    const ItemsToRender = SortedItems?.slice(ItemsOffset, ItemsOffset + ItemsDisplayCount);

    useEffect(() => {
        setCurrentPage(searchParams.page ? Number(searchParams.page) : 1);
    }, [searchParams]);

    useEffect(() => {
        axios.post(`${process.env.defaultApiEndpoint}/api/posts/getPostsByCategory`, { category }).then(res => {
            const { status, data } = res.data;

            if (status === 200) {
                setPosts(data);
            }
        });
    }, []);

    return (
        <div className={`flex flex-col gap-[2.20rem]`}>
            <FilterSelector />
            <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                {ItemsToRender?.map((post, idx) => (
                    <VehiclePostCard postData={post} idx={idx} key={`vehicle_post_card_${idx}`} />
                ))}
            </div>
            {ItemsToRender.length > 0 && (
                <div className={`laptop:absolute left-0 flex items-center justify-center bottom-[1rem] w-full`}>
                    <PaginationWrapper currentPage={currentPage} pages={Math.ceil(posts.length / ItemsDisplayCount)} />
                </div>
            )}
        </div>
    )
}