'use client';

import { useEffect, useState } from "react";
import { PostCategoriesPage } from "./categoriesPage";
import { NextButton } from "@components/buttons/nextButton";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { PostInformationPage } from "./informationPage";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";

enum PageWindows { Category, Information, Settings, Payment };
// const LockedPages = [PageWindows.Payment]; // Unlocked only if user has filled all other data in the forms

type PageMapItem = {
    title: string;
    renderItem: JSX.Element;
};

export const CreatePostPage = ({ allMakes }: { allMakes: any }) => {
    const t = useLanguage();
    const { category, makeId, modelId } = usePostCreateStore();
    const { vehicleMakes, setMakes } = useVehicleStore();
    const [activeWindow, setActiveWindow] = useState<PageWindows>(PageWindows.Category);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        setMakes(allMakes); // Set Vehicle models
    }, []);

    const PagesMap: { [key in PageWindows]: PageMapItem } = {
        [PageWindows.Category]: {
            title: 'Skelbimo kategorija',
            renderItem: <PostCategoriesPage />
        },
        [PageWindows.Information]: {
            title: 'Skelbimo informacija',
            renderItem: <PostInformationPage />
        },
        [PageWindows.Settings]: {
            title: 'Skelbimo nustatymai',
            renderItem: <></>
        },
        [PageWindows.Payment]: {
            title: 'Apmokėjimas',
            renderItem: <></>
        }
    };

    const isAllowedToSwitch = () => {
        setErrorMessage(""); // Clear error message
        if (category === null || category === undefined) {
            setActiveWindow(PageWindows.Category);
            setErrorMessage(t.post.errors.category_not_selected);
            return false;
        }

        if (makeId === null) {
            setActiveWindow(PageWindows.Information);
            setErrorMessage(t.post.errors.make_not_selected);
            return false;
        }

        if (modelId === null) {
            setActiveWindow(PageWindows.Information);
            setErrorMessage(t.post.errors.model_not_selected);
            return false;
        }

        return true;
    }

    const RenderWindowItem = ({ item, keyObj }: { item: PageMapItem, keyObj: PageWindows }) => {
        const HandleSwitchPage = () => {
            if (!isAllowedToSwitch()) return;

            setActiveWindow(keyObj)
        }
        return (
            <button
                className={`text-base full_hd:text-base_2xl hover:cursor-pointer ${activeWindow === keyObj ? `text-highlight font-medium` : `text-placeholder`}`}
                onClick={HandleSwitchPage}
            >{item.title}</button>
        );
    }

    const OnNextClick = () => {
        if (!isAllowedToSwitch()) return;

        if (Object.keys(PagesMap).length - 1 === activeWindow) return; // If last page

        setActiveWindow((prev) => prev + 1);
    }

    return (
        <div className={`flex flex-col gap-[2.20rem]`}>
            <div className={`${errorMessage ? `flex` : `hidden`} px-[1.56rem] py-[0.88rem] bg-error_secondary`}>{errorMessage}</div>
            <div className={`flex gap-[1.9rem] border-b-[1px] border-border pb-[1.25rem]`}>
                {Object.keys(PagesMap).map((key, idx) => (
                    <RenderWindowItem item={PagesMap[Number(key) as PageWindows]} key={`page_window_tracker_${idx}`} keyObj={Number(key)} />
                ))}
            </div>
            {PagesMap[activeWindow].renderItem}
            <div className={`flex justify-end`}>
                <NextButton onClick={OnNextClick}>{t.general.continue}</NextButton>
            </div>
        </div>
    );
};