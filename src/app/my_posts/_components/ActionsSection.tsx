"use client";

import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";

export const ActionsSection = ({ postData }: { postData: Post }) => {
    const { isActive } = postData;
    const t = useLanguage();
    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <span className={`text-base full_hd:text-base_2xl text-primary`}>{t.my_posts.actions}</span>
            <div className={`flex gap-[1.25rem]`}>
                <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight disabled:cursor-not-allowed disabled:opacity-80`} disabled={!isActive}>Iškelti skelbimą</button>
                {!isActive ? (
                    <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-highlight`}>Įsigyti prenumeratą</button>
                ) : (
                    <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-error`}>Atšaukti prenumeratą</button>
                )}
                <button type="button" className={`px-[0.62rem] py-[0.5rem] text-[#FFF] rounded-[0.1875rem] bg-error_secondary`}>Pašalinti skelbimą</button>
            </div>
        </div>
    )
}