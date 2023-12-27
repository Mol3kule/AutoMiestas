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
            redirectUrlComplete: '/'
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <button
            type='button'
            className={`flex items-center justify-center w-full h-[2.6875rem] rounded-[0.1875rem] bg-border gap-[0.5rem]`}
            onClick={HandleSignInGoogle}
        >
            <Image
                src={GoogleIcon}
                alt='Google logo'
                className={`w-[0.9375rem] h-[0.9375rem] object-contain`}
                width={15}
                height={15}
            />
            <span className={`text-primary text-base`}>Prisijungti su Google paskyra.</span>
        </button>
    )
}