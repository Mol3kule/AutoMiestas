import { auth } from "@clerk/nextjs";
import { MyPostsPageHeader } from "./_components/PageHeader";
import { redirect } from "next/navigation";
import axios from "axios";
import { RenderPostCard } from "./_components/PostCard";
import { Post } from "@/types/post.type";

const getAuthorPosts = async (token: string | null) => {
    return await axios.get(`${process.env.defaultApiEndpoint}/api/posts/getAuthorPosts`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);
}

const MyPostsPage = async () => {
    const { userId, getToken } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const token = await getToken();
    const { status, data, message }: { status: number, data: Post[], message: string } = await getAuthorPosts(token);

    if (status !== 200) {
        // console.log(message);
        return null;
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <MyPostsPageHeader />
            {data.map((post, idx) => (
                <RenderPostCard postData={post} key={`${post}_${idx}`} />
            ))}
        </div>
    );
}

export default MyPostsPage;