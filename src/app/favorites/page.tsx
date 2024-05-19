import { auth } from "@clerk/nextjs";
import { FavoritePostsPage } from "./_components/favorites-page";
import { redirect } from "next/navigation";

const Page = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <div className={`flex flex-col gap-[2.20rem] flex-1`}>
            <FavoritePostsPage />
        </div>
    );
};

export default Page;