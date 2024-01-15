'use client';

import { FormEvent } from "react";

export const AuthWrapper = ({ children, HandleFormSubmit }: { children: React.ReactNode, HandleFormSubmit: (formData: FormEvent) => void }) => {
    return (
        <form className={`w-full h-full tablet:h-auto tablet:w-auto flex items-center justify-center bg-[#FFF] py-[2.81rem] rounded-[0.1875rem] full_hd:w-[35rem]`} onSubmit={(e) => HandleFormSubmit(e)}>
            <div className={`flex flex-col items-center justify-center gap-[1.35rem] px-[2.81rem] w-full`}>
                {children}
            </div>
        </form>
    )
}