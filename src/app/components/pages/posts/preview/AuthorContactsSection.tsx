'use client';

import { Spinner } from "@/app/components/spinner";
import { useUser } from "@clerk/nextjs";
import { Ban, Heart, Link, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export const AuthorContactsSection = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const HandlePhoneClick = () => {
        if (isLoaded && !user) {
            router.push('/sign-in');
        }
    }

    return (
        <div className={`flex flex-col laptop:flex-row gap-[0.94rem] laptop:h-[4.5rem] bg-highlight_secondary rounded-[0.1875rem] px-[0.94rem] py-[0.94rem] ${!isLoaded ? `items-center justify-center` : `justify-between`}`}>
            {isLoaded ? (
                <>
                    <button type="button" onClick={HandlePhoneClick} className={`flex bg-primary w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.9] duration-700`}>
                        <Phone className={`text-[#FFF] w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                    </button>
                    <button type="button" className={`flex bg-[#FFF] w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.6] duration-700`}>
                        <Link className={`text-primary w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                    </button>
                    <button type="button" className={`flex bg-[#FFF] w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.6] duration-700`}>
                        <Heart className={`text-primary w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                    </button>
                    <button type="button" className={`flex bg-[#FFF] w-full px-[1.31rem] py-[0.94rem] laptop:py-0 rounded-[0.1875rem] items-center justify-center hover:opacity-[0.6] duration-700`}>
                        <Ban className={`text-primary w-[0.9375rem] h-[0.9375rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                    </button>
                </>
            ) : (
                <Spinner color="dark" />
            )}
        </div>
    )
}