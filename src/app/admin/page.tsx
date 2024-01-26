import axios from "axios";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { UserType } from "@/types/user.type";
import { AdminPage } from "./_components/AdminPage";

type PageProps = {
    params: {},
    searchParams: any
}

const Page = async ({ searchParams }: PageProps) => {
    const { userId, getToken } = auth();

    if (!userId) {
        redirect("/sign-in");
    };

    const { status, data }: { status: number, data: UserType } = await axios.get(`${process.env.defaultApiEndpoint}/api/auth/getUser`, { headers: { "Authorization": `Bearer ${await getToken()}` } }).then(res => res.data);

    if (status !== 200) {
        redirect("/");
    };
    
    if (data.admin_rank <= 0) {
        redirect("/");
    };

    return <AdminPage />
};

export default Page;