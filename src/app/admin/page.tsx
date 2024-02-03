import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { AdminPage } from "./_components/AdminPage";
import { getUserById } from "@/actions/users/user.actions";

const Page = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    };

    const { status, data: userData } = await getUserById(userId);

    if (status !== 200 || !userData) {
        redirect("/");
    };

    if (userData.admin_rank <= 0) {
        redirect("/");
    };

    return <AdminPage />
};

export default Page;