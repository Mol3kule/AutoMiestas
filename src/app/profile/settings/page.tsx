import axios from "axios";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { RenderComponents } from "./_components/RenderComponents";

const getUserData = async (token: string | null) => {
    return await axios.get(`${process.env.defaultApiEndpoint}/api/auth/getUser`, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);
}

const ProfileSettingsPage = async () => {
    const { userId, getToken } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const token = await getToken();
    const userData = await getUserData(token);

    if (userData.status !== 200) {
        redirect('/');
    }

    return (
        <RenderComponents userData={userData.data} />
    )
};

export default ProfileSettingsPage;