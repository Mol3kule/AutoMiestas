'use client';

import { Post } from "@/types/post.type";
import { VehiclePostCard } from "./cards/vehicle";
import { FilterSelector } from "./filter/filterSelector";

type HomePageProps = {
    posts: Post[];
}

export const HomePage = ({ posts }: HomePageProps) => {
    return (
        <div className={`flex flex-col gap-[2.20rem]`}>
            <FilterSelector />
            <div className={`grid grid-cols-1 laptop:grid-cols-3 flex-wrap gap-[1.56rem] justify-between`}>
                {posts.map((post, idx) => (
                    <VehiclePostCard postData={post} idx={idx} key={`vehicle_post_card_${idx}`} />
                ))}
            </div>
        </div>
    )
}