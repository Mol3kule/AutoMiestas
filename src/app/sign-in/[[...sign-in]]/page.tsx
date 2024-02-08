import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AuthWrap } from "./_components/AuthWrap";
import { createUser } from "@/actions/users/user.actions";

const SignInPage = async () => {
    const { userId } = auth();

    if (userId) {
        const userData = await clerkClient.users.getUser(userId!);
        if (userData) {
            const { status } = await createUser(userId!, userData.emailAddresses[0].emailAddress, userData.firstName!, userData.lastName!, userData.phoneNumbers[0].phoneNumber, null!);
            if (status === 200) redirect('/');
        }
    }

    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-highlight_secondary flex items-center justify-center`}>
            <AuthWrap />
        </div>
    )
}

export default SignInPage;