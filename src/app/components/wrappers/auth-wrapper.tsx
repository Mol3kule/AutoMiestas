'use client';

import { FormEvent } from "react";

export const AuthWrapper = ({ children, HandleFormSubmit }: { children: React.ReactNode, HandleFormSubmit: (formData: FormEvent) => void }) => {
    return (
        <form className={`w-full h-full laptop:h-auto flex items-center justify-center bg-[#FFF] py-[2.81rem] rounded-[0.1875rem] laptop:max-w-[35rem] full_hd:max-w-[45rem] overflow-auto`} onSubmit={(e) => HandleFormSubmit(e)}>
            <div className={`flex flex-1 flex-col items-center justify-center gap-[1.35rem] px-[2.81rem]`}>
                {children}
            </div>
        </form>
    )
}