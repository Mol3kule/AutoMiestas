import { getPostBySlug, increasePostViewById } from "@/actions/posts/post.actions";
import { PostPage } from "@/components/pages/posts/preview/postPage";
import { Spinner } from "@/components/spinner";
import { Post } from "@/types/post.type";
import { clerkClient } from "@clerk/nextjs";
import { Suspense } from "react";

type RenderPostPageProps = {
    params: {
        post: string[];
    }
    searchParams: {}
}

const RenderPostPage = async ({ params }: RenderPostPageProps) => {
    const post = await getPostBySlug(params.post[0]);
    
    if (!post) {
        return (
            <div className={`flex flex-1 items-center justify-center`}>
                Skelbimas neegzistuoja
            </div>
        )
    };

    await increasePostViewById(post.id);
    const authorPhone = await clerkClient.users.getUser(post.authorId).then((res) => res.phoneNumbers[0].phoneNumber);

    const RenderLoadingPage = () => {
        return (
            <div className={`flex justify-center items-center w-full h-full`}>
                <Spinner color="light" />
            </div>
        )
    }

    return (
        <Suspense fallback={<RenderLoadingPage />}>
            <PostPage post={post as Post} phoneNumber={authorPhone} />
        </Suspense>
    );
}

export default RenderPostPage;