import { AuthenticateWithRedirectCallback, auth, clerkClient } from "@clerk/nextjs";
import { createUser } from "@/actions/users/user.actions";
import { redirect } from "next/navigation";

import { AuthWrap } from "./_components/AuthWrap";
import { Spinner } from "@/components/spinner";

type PageProps = {
    params: {};
    searchParams: {
        provider?: string;
    };
};

const SignInPage = async ({ searchParams }: PageProps) => {
    const { userId } = auth();

    const isGoogle = searchParams.provider === 'google';
    if (userId) {
        const userData = await clerkClient.users.getUser(userId!);
        if (userData) {
            await createUser(userId!, userData.emailAddresses[0].emailAddress, userData.firstName!, userData.lastName!, userData.phoneNumbers[0].phoneNumber, null!);
            redirect('/');
        }
    }

    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-highlight_secondary flex items-center justify-center`}>
            {!isGoogle ? (
                <AuthWrap />
            ) : (
                <>
                    <AuthenticateWithRedirectCallback afterSignInUrl={'/sign-in'} afterSignUpUrl={'/sign-in'} />
                    <Spinner />
                </>
            )}
        </div>
    );
};

export default SignInPage;