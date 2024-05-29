import { getPostBySlugAndAuthor } from "@/actions/posts/post.actions"
import { Post } from "@/types/post.type"
import { auth, clerkClient } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { CreatePostPage } from "../_components/create-post-wrapper"

type PageProps = {
    params: {
        slug: string;
    }
};

const PostCreatePage = async ({ params }: PageProps) => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user.phoneNumbers.length) {
        redirect('/profile/settings');
    }

    
    if (params.slug && params.slug[0].length > 0) {
        const postData = await getPostBySlugAndAuthor(params.slug[0]) as Post | null;

        if (!postData) {
            redirect('/create');
        }
        
        return (
            <CreatePostPage postData={postData} />
        );
    }

    return (
        <CreatePostPage postData={null} />
    );
}

export default PostCreatePage;