import { auth, clerkClient } from "@clerk/nextjs";
import { CreatePostPage } from "../components/pages/posts/create/page";
import { redirect } from "next/navigation";

const getAllMakes = async () => {
    return await fetch(`${process.env.defaultApiEndpoint}/api/vehicles/getAllMakes`)
        .then(res => res.json())
        .catch(err => console.log(err));
}

const PostCreatePage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user.phoneNumbers.length) {
        redirect('/profile/settings');
    }

    const { status, data } = await getAllMakes();

    return (
        <CreatePostPage allMakes={data} />
    );
}

export default PostCreatePage;