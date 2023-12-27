'use client';

import { Mail } from "lucide-react";
import { UserDrawer } from '../drawers/userDrawer';
import { useRouter } from "next/navigation";

export const NavBar = () => {
    const router = useRouter();

    return (
        <header>
            <nav className={`flex justify-between px-[1.87rem] 2xl:px-[31.25rem] py-[20px] border-[1px] border-border gap-[1.25rem]`}>
                <div className={`flex flex-col text-primary`}>
                    <span className={`text-[0.9375rem] font-medium`}><span className={`text-highlight`}>Auto</span>miestas.lt</span>
                    <span className={`text-[0.625rem] font-normal`}>Skelbimų portalas</span>
                </div>
                <div className={`flex gap-[1.25rem] items-center`}>
                    <Mail className={`text-primary w-[1.375rem] h-[1.375rem]`} />
                    <UserDrawer />
                </div>
            </nav>
            <nav className={`flex justify-between px-[1.87rem] 2xl:px-[31.25rem] py-[0.88rem] border-b-[1px] border-border gap-[1.25rem]`}>
                <div className={`flex gap-[1.25rem] text-primary`}>
                    <button className={`px-[0.62rem] py-[0.38rem] bg-highlight text-base text-[#FFF] rounded-[0.1875rem]`} onClick={() => router.push('/')}>Skelbimai</button>
                    <button className={`px-[0.62rem] py-[0.38rem] text-base text-primary rounded-[0.1875rem]`}>Įkelti skelbimą</button>
                </div>
            </nav>
        </header>
    )
}