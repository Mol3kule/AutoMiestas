import { auth } from "@clerk/nextjs";
import { MyPostsPageHeader } from "./_components/PageHeader";
import { redirect } from "next/navigation";
import { MyPostsPage } from "./_components/my-posts-page";

const MyPostsPageWrapper = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <div className={`flex flex-col gap-[1.25rem] flex-1`}>
            <MyPostsPageHeader />
            <MyPostsPage />
        </div>
    );
}

export default MyPostsPageWrapper;