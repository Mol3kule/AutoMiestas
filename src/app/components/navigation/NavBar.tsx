'use client';

import { Mail } from "lucide-react";
import { UserDrawer } from '../drawers/userDrawer';
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export const NavBar = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser();

    const RedirectToPage = (page: string) => {
        router.push(page);
        location.reload();
    }

    return (
        <header>
            <nav className={`flex justify-between px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[20px] border-[1px] border-border gap-[1.25rem]`}>
                <div className={`flex flex-col text-primary`}>
                    <span className={`text-header full_hd:text-header_2xl font-medium`}><span className={`text-highlight`}>Auto</span>miestas.lt</span>
                    <span className={`text-sm full_hd:text-sm_2xl font-normal`}>Skelbimų portalas</span>
                </div>
                <div className={`flex gap-[1.25rem] items-center`}>
                    {isLoaded && user && (
                        <Mail className={`text-primary w-[1.375rem] h-[1.375rem]`} />
                    )}
                    <UserDrawer />
                </div>
            </nav>
            <nav className={`flex justify-between px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[0.88rem] border-b-[1px] border-border gap-[1.25rem]`}>
                <div className={`flex gap-[1.25rem] text-primary`}>
                    <button className={`px-[0.62rem] py-[0.38rem] bg-highlight text-base full_hd:text-base_2xl text-[#FFF] rounded-[0.1875rem]`} onClick={() => RedirectToPage('/')}>Skelbimai</button>
                    <button className={`px-[0.62rem] py-[0.38rem] text-base full_hd:text-base_2xl text-primary rounded-[0.1875rem]`} onClick={() => RedirectToPage('/create')}>Įkelti skelbimą</button>
                </div>
            </nav>
        </header>
    )
}