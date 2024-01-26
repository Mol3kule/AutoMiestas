'use client';

import TrailerSvg from "@/app/components/svg/categories/trailerSvg";
import VehicleSvg from "@/app/components/svg/categories/vehicleSvg";
import Tires_wheelsSvg from "@/app/components/svg/categories/tires_wheelsSvg";
import ScooterSvg from "@/app/components/svg/categories/scooterSvg";
import PlaneSvg from "@/app/components/svg/categories/planeSvg";
import PartSvg from "@/app/components/svg/categories/partSvg";
import MotorcycleSvg from "@/app/components/svg/categories/motorcycleSvg";
import HeavyTransportSvg from "@/app/components/svg/categories/heavySvg";
import AgriculturalTransportSvg from "@/app/components/svg/categories/agriculturalSvg";
import ConstructionTransportSvg from "@/app/components/svg/categories/constructionSvg";
import BoatSvg from "@/app/components/svg/categories/boatSvg";

import { usePostCreateStore } from "@store/posts/postCreate.store";
import { Categories, PostObj } from "@/classes/PostCategories";
import { useLanguage } from "@/lib/languageUtils";

export const PostCategoriesPage = () => {
    const t = useLanguage();

    const { category, setCategory, resetFields } = usePostCreateStore();

    const RenderCategoryItem = ({ item, idx }: { item: string, idx: Categories }) => {
        const CategoryChangeHandler = () => {
            setCategory(idx);
            resetFields(); // Reset fields on category change
        }

        return (
            <button type="button" onClick={CategoryChangeHandler} className={`w-full py-[1.41rem] rounded-[0.1875rem] ${category === idx ? `text-[#FFF] bg-primary` : `text-primary bg-highlight_secondary`}`}>
                <div className={`flex flex-col laptop:flex-row items-center gap-[1.25rem] px-[2.20rem]`}>
                    <div>
                        {RenderSvg({ category: item.toLowerCase(), color: category === idx ? `#FFF` : `#A1A1A1` })}
                    </div>
                    <span className={`text-base full_hd:text-base_2xl`}>{t.post.categories[item as keyof typeof t.post.categories]}</span>
                </div>
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
                {Object.values(PostObj.getCategories()).map((objKey, idx) => (
                    <RenderCategoryItem item={PostObj.getLabelByIndex(Number(objKey))} idx={Number(objKey)} key={`category_selector_${idx}`} />
                ))}
            </div>
        </div>
    );
};

const RenderSvg = ({ category, color }: { category: string, color: string }) => {
    switch (category) {
        case "vehicles": {
            return <VehicleSvg color={color} />
        }
        case "motorcycles": {
            return <MotorcycleSvg color={color} />
        }
        case "heavy": {
            return <HeavyTransportSvg color={color} />
        }
        case "agricultural": {
            return <AgriculturalTransportSvg color={color} />
        }
        case "construction": {
            return <ConstructionTransportSvg color={color} />
        }
        case "trailers": {
            return <TrailerSvg color={color} />
        }
        case "boats": {
            return <BoatSvg color={color} />
        }
        case "tires_wheels": {
            return <Tires_wheelsSvg color={color} />
        }
        case "scooters": {
            return <ScooterSvg color={color} />
        }
        case "planes": {
            return <PlaneSvg color={color} />
        }
        case "parts": {
            return <PartSvg color={color} />
        }

    }
}