"use client";

import { useLanguage } from "@/lib/languageUtils"

export const MyPostsPageHeader = () => {
    const t = useLanguage();
    return (
        <div className={`flex flex-col gap-[0.88rem]`}>
            <span className={`text-base full_hd:text-base_2xl text-primary`}>{t.my_posts.header_title}</span>
            <span className={`text-base full_hd:text-base_2xl text-placeholder_secondary`}>{t.my_posts.header_description}</span>
        </div>
    )
}