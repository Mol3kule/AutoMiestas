'use client';

import { Categories, PostObj } from "@/classes/PostCategories";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@store/posts/postCreate.store";
import Image from "next/image";

export const PostCategoriesPage = () => {
    const t = useLanguage();

    const { category, setCategory } = usePostCreateStore();

    const RenderCategoryItem = ({ item, idx }: { item: string, idx: Categories }) => {
        const CategoryChangeHandler = () => {
            setCategory(idx);
        }

        return (
            <button type="button" onClick={CategoryChangeHandler} className={`flex gap-[1.25rem] w-full px-[2.20rem] py-[1.41rem] rounded-[0.1875rem] items-center ${category === idx ? `text-[#FFF] bg-primary` : `text-primary bg-highlight_secondary`}`}>
                <Image 
                    src={`/assets/icons/posts/create/categories/${item.toLowerCase()}.svg`}
                    alt="category_icon"
                    width={30}
                    height={30}
                    className={`${category === idx ? `fill-[#FFF]` : `fill-placeholder_secondary`} w-[1.875rem] h-[1.875rem]`}
                />
                <span className={`text-base full_hd:text-base_2xl`}>{t.post.categories[item as keyof typeof t.post.categories]}</span>
            </button>
        );
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>Pasirinkite kategoriją</span>
                <span className={`text-placeholder_secondary`}>Pasirinkite kategoriją, kuriai priklauso parduodamai tr. priemonė ar kt. (Galima pasirinkti tik vieną kategoriją)</span>
            </div>

            <div className={`grid grid-cols-2 gap-[1.25rem]`}>
                {Object.keys(PostObj.getAllCategories()).map((objKey, idx) => (
                    <RenderCategoryItem item={PostObj.getLabelByIndex(Number(objKey))} idx={Number(objKey)} key={`category_selector_${idx}`} />
                ))}
            </div>
        </div>
    )
}