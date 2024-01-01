'use client';

import { Post } from "@/types/post.type";
import { VehiclePostCard } from "./cards/vehicle";

type HomePageProps = {
    posts: Post[];
}

export const HomePage = ({ posts }: HomePageProps) => {
    return (
        <div className={`flex flex-wrap gap-[1.56rem] justify-between`}>
            {posts.map((post, idx) => (
                <VehiclePostCard postData={post} idx={idx} key={`vehicle_post_card_${idx}`}/>
            ))}
        </div>
    )
}