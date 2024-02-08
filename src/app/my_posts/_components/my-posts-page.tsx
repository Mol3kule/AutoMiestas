"use client";

import { getPostsByUserId } from "@/actions/posts/post.actions";
import { Spinner } from "@/components/spinner";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { RenderPostCard } from "./PostCard";
import { Post } from "@/types/post.type";

export const MyPostsPage = () => {
    const { user } = useUser();

    const { isLoading, data: posts } = useQuery({
        queryKey: ["getMyPosts", { user }],
        queryFn: async () => {
            if (!user) return null;
            return await getPostsByUserId(user?.id);
        },
        staleTime: Infinity
    });

    return (
        <div className={`flex ${isLoading ? `flex-1 items-center justify-center` : `flex-col`}`}>
            {!isLoading ? (
                posts?.map((post, idx) => (
                    <RenderPostCard postData={post as Post} key={`${post}_${idx}`} />
                ))
            ) : (
                <Spinner />
            )}
        </div>
    );
};