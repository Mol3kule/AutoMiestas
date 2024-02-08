import { getPostBySlug } from "@/actions/posts/post.actions";
import { PostPage } from "@/components/pages/posts/preview/postPage";
import { Spinner } from "@/components/spinner";
import { Post } from "@/types/post.type";
import { Suspense } from "react";

type RenderPostPageProps = {
    params: {
        post: string[];
    }
    searchParams: {}
}

const RenderPostPage = async ({ params }: RenderPostPageProps) => {
    const post = await getPostBySlug(params.post[0]);
    
    if (!post) return null;

    // axios.post(`${process.env.defaultApiEndpoint}/api/posts/incrementViewById`, { postId: data.id }, { headers: { 'Authorization': `Bearer ${await getToken()}` } });

    // const authorPhone = await clerkClient.users.getUser(data.authorId).then((res) => res.phoneNumbers[0].phoneNumber);

    const RenderLoadingPage = () => {
        return (
            <div className={`flex justify-center items-center w-full h-full`}>
                <Spinner color="light" />
            </div>
        )
    }

    return (
        <Suspense fallback={<RenderLoadingPage />}>
            <PostPage post={post as Post} phoneNumber={''} />
        </Suspense>
    );
}

export default RenderPostPage;