import { auth, clerkClient } from "@clerk/nextjs";
import { CreatePostPage } from "./_components/create-post-wrapper";
import { redirect } from "next/navigation";

const PostCreatePage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user.phoneNumbers.length) {
        redirect('/profile/settings');
    }

    return (
        <CreatePostPage />
    );
}

export default PostCreatePage;