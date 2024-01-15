'use client';

import { useSignIn } from '@clerk/nextjs';
import GoogleIcon from '/public/assets/icons/google.png';
import Image from "next/image";

export const LoginWithGoogleButton = () => {
    const { signIn } = useSignIn();

    const HandleSignInGoogle = async () => {
        await signIn?.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/google-sign-in'
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <button
            type='button'
            className={`flex items-center justify-center w-full py-[0.88rem] rounded-[0.1875rem] bg-border gap-[0.5rem]`}
            onClick={HandleSignInGoogle}
        >
            <Image
                src={GoogleIcon}
                alt='Google logo'
                className={`w-[1.5rem] h-[1.5rem]`}
                width={1920}
                height={1080}
            />
            <span className={`text-primary text-base full_hd:text-base_2xl`}>Prisijungti su Google paskyra.</span>
        </button>
    )
}