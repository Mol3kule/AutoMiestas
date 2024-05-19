import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { RenderComponents } from "./_components/RenderComponents";

const ProfileSettingsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    return (
        <RenderComponents />
    )
};

export default ProfileSettingsPage;