import { PostPage } from "@/app/components/pages/posts/preview/postPage";
import { Spinner } from "@/app/components/spinner";
import { Post } from "@/types/post.type";
import { Suspense } from "react";

type RenderPostPageProps = {
    params: {
        post: string[];
    }
    searchParams: {}
}

type PostData = {
    status: 'success' | 'error';
    post: Post;
}

const getPostById = async (id: number) => {
    return await fetch(`${process.env.defaultApiEndpoint}/api/posts/getPostById`, {
        method: 'POST',
        body: JSON.stringify({
            postId: id
        })
    }).then(res => res.json()).catch((error) => {
        console.log(`[getPostById]: ${error}`);
        return { status: 'error' }
    });
}

const RenderPostPage = async ({ params }: RenderPostPageProps) => {
    const { status, post }: PostData = await getPostById(1);

    if (!status || status === 'error' || params.post.length < 3) return null; // Return error page

    const RenderLoadingPage = () => {
        return (
            <div className={`flex justify-center items-center w-full h-full`}>
                <Spinner color="light"/>
            </div>
        )
    }

    return (
        <Suspense fallback={<RenderLoadingPage />}>
            <PostPage post={post} />
        </Suspense>
    );
}

export default RenderPostPage;