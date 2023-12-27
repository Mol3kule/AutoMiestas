'use client';

import { FormEvent } from "react";

export const AuthWrapper = ({ children, HandleFormSubmit }: { children: React.ReactNode, HandleFormSubmit: (formData: FormEvent) => void }) => {
    return (
        <form className={`w-full h-full md:h-auto md:w-[29.0625rem] bg-[#FFF] py-[2.81rem] rounded-[0.1875rem] 2xl:scale-[1.2]`} onSubmit={(e) => HandleFormSubmit(e)}>
            <div className={`flex flex-col items-center justify-center gap-[1.35rem] px-[2.81rem]`}>
                {children}
            </div>
        </form>
    )
}