import { PostPage } from "@/app/components/pages/posts/preview/postPage";
import { Spinner } from "@/app/components/spinner";
import { PostVehicle } from "@/types/post.type";
import { auth, clerkClient } from "@clerk/nextjs";
import axios from "axios";
import { Suspense } from "react";

type RenderPostPageProps = {
    params: {
        post: string[];
    }
    searchParams: {}
}

type PostData = {
    status: number;
    data: PostVehicle;
    message?: string;
}

const getPostById = async (params: string[]) => {
    return await axios.post(`${process.env.defaultApiEndpoint}/api/posts/getPostByParams`, {
        postId: Number(params[0]),
        timestamp: Number(params[2])
    }).then(async (res) => await res.data);
}

const RenderPostPage = async ({ params }: RenderPostPageProps) => {
    if (params.post.length < 3 || params.post.length > 3) return null;
    if (typeof Number(params.post[0]) !== 'number' || typeof Number(params.post[2]) !== 'number') return null;

    const { status, data, message }: PostData = await getPostById(params.post);

    if (status !== 200) {
        return null;
    }

    const { getToken } = auth();

    axios.post(`${process.env.defaultApiEndpoint}/api/posts/incrementViewById`, { postId: data.id }, { headers: { 'Authorization': `Bearer ${await getToken()}` } });

    const authorPhone = await clerkClient.users.getUser(data.authorId).then((res) => res.phoneNumbers[0].phoneNumber);

    const RenderLoadingPage = () => {
        return (
            <div className={`flex justify-center items-center w-full h-full`}>
                <Spinner color="light" />
            </div>
        )
    }

    return (
        <Suspense fallback={<RenderLoadingPage />}>
            <PostPage post={data} params={params.post} phoneNumber={authorPhone}/>
        </Suspense>
    );
}

export default RenderPostPage;