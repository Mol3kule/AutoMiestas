import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AuthWrap } from "./_components/AuthWrap";

const SignInPage = () => {
    const { userId } = auth();

    if (userId !== null) {
        redirect('/');
    }

    return (
        <div className={`absolute top-0 left-0 w-full h-full bg-highlight_secondary flex items-center justify-center`}>
            <AuthWrap />
        </div>
    )
}

export default SignInPage;