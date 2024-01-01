'use client';

import { Rating, VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { Post } from "@/types/post.type";

type PostSecondaryInfoProps = {
    post: Post;
}

export const SecondaryInformationSection = ({ post }: PostSecondaryInfoProps) => {
    const t = useLanguage();

    const TagsSection = () => {
        return (
            <div className={`flex flex-wrap gap-[0.88rem] text-center items-center`}>
                {post.tags?.map((tag, index) => (
                    <div className={`px-[0.62rem] py-[0.12rem] bg-highlight_secondary rounded-[0.1875rem] text-primary text-base full_hd:text-base_2xl`} key={`v_tag_${index}`}>{t.vehicleInfo.tags[VehicleObj.getTagByIndex(tag) as keyof typeof t.vehicleInfo.tags]}</div>
                ))}
            </div>
        );
    }

    const CommentSection = () => {
        return (
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`font-medium text-primary`}>Pardavėjo komentarai</span>
                <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, officiis quam nulla ipsam at doloribus eos porro dolore sint molestias suscipit voluptates sapiente debitis quidem magni optio illum, provident tempora?</span>
                <TagsSection />
            </div>
        );
    }

    const VehicleSpecs = () => {
        return (
            <div className={`flex flex-col gap-[0.8rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl font-medium`}>Specifikacijos</span>
                {Object.keys(post.ratingByAuthor)?.map((value, index) => (
                    <div className={`flex flex-col gap-[0.88rem]`} key={`v_spec_${index}`}>
                        <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.rating[VehicleObj.getRatingByIndex(Number(value)) as keyof typeof t.vehicleInfo.rating]}</span>

                        <div className={`flex gap-[0.63rem]`}>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div className={`w-full h-[0.625rem] full_hd:h-[0.813rem] rounded-[0.125rem] ${post.ratingByAuthor[Number(value) as Rating] >= i ? `bg-highlight` : `bg-border`}`} key={`v_rating_${i}`}></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <CommentSection />
            <hr className={`text-border bg-border`} />
            <VehicleSpecs />
        </div>
    );
}