"use client";

import { getDateFromTimestamp } from "@/lib/getDate";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";

export const InformationSection = ({ postData }: { postData: Post }) => {
    const t = useLanguage();
    return (
        <div className={`flex flex-col mt-[0.88rem] gap-[1.25rem]`}>
            <span>{t.general.information}</span>
            <div className={`flex gap-[1.25rem]`}>
                <CardItem placeholder={t.my_posts.post_uploaded} text={getDateFromTimestamp(postData.periods.time_created)}/>
                <CardItem placeholder={t.my_posts.likes} text={postData.statistics.times_liked.length.toString()}/>
                {/* {postData.subscriptionId.length > 0 ? (
                    // <CardItem />
                    <></>
                ) : (
                    <CardItem placeholder={``} />
                )} */}
            </div>
        </div>
    )
}

const CardItem = ({ placeholder, text }: { placeholder: string, text: string }) => {
    return (
        <div className={`px-[0.62rem] py-[0.5rem] rounded-[1.125rem] flex gap-[0.5rem] bg-[#FFF]`}>
            <span className={`text-primary text-base full_hd:text-base_2xl`}>{placeholder}</span>
            <span className={`text-highlight text-base full_hd:text-base_2xl`}>{text}</span>
        </div>
    )
}