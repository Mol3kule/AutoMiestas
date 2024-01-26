'use client';

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { getVehicles } from "@/lib/getVehicles";

import { PostCategoriesPage } from "./_components/categoriesPage";
import { PostInformationPage } from "./_components/informationPage";
import { PostPaymentPage } from "./_components/paymentPage";
import ErrorBox from "@/app/components/errorBox";
import { NextButton } from "@/app/components/buttons/nextButton";

enum PageWindows { Category, Information, Payment };

type PageMapItem = {
    title: string;
    renderItem: JSX.Element;
};

export const CreatePostPage = () => {
    const [activeWindow, setActiveWindow] = useState<PageWindows>(PageWindows.Category);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const { checkFields } = usePostCreateStore();
    const t = useLanguage();

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) {
            getVehicles().then(async (res) => {
                const { makesData, modelsData } = res;

                if (makesData.status === 200 && modelsData.status === 200) {
                    setMakes(makesData.data);
                    setModels(modelsData.data);
                }
            });
        }
    }, []);

    const PagesMap: { [key in PageWindows]: PageMapItem } = {
        [PageWindows.Category]: {
            title: t.post.titles.category_section,
            renderItem: <PostCategoriesPage />
        },
        [PageWindows.Information]: {
            title: t.post.titles.information_section,
            renderItem: <PostInformationPage />
        },
        [PageWindows.Payment]: {
            title: t.post.titles.payment_section,
            renderItem: <PostPaymentPage />
        }
    };

    const ScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const isAllowedToSwitch = (targetPage: PageWindows) => {
        if (activeWindow === targetPage) return false;

        if (targetPage === PageWindows.Payment) {
            const { status, message } = checkFields();
            if (!status) {
                setErrorMessage(t.post.errors[message as keyof typeof t.post.errors]);
                ScrollToTop();
                return false;
            }
        }

        return true;
    }

    const HandleWindowSwitch = () => {
        if (activeWindow === PageWindows.Category) {
            setActiveWindow(PageWindows.Information);
            return;
        }

        if (isAllowedToSwitch(activeWindow + 1)) {
            setActiveWindow(PageWindows.Payment);
        }
    }

    const RenderWindowItem = ({ item, keyObj }: { item: PageMapItem, keyObj: PageWindows }) => {
        const HandleSwitchPage = () => {
            if (!isAllowedToSwitch(keyObj)) return;
            setActiveWindow(keyObj)
        }
        return (
            <button
                className={`text-base full_hd:text-base_2xl hover:cursor-pointer ${activeWindow === keyObj ? `text-highlight font-medium` : `text-placeholder`}`}
                onClick={HandleSwitchPage}
            >{item.title}</button>
        );
    }

    return (
        <div className={`flex flex-col gap-[2.20rem]`}>
            {errorMessage && (
                <ErrorBox title={`Prašome užpildyti visus reikalingus laukus!`} message={errorMessage} />
            )}
            <div className={`flex gap-[1.9rem] border-b-[1px] border-border pb-[1.25rem]`}>
                {Object.keys(PagesMap).map((key, idx) => (
                    <RenderWindowItem item={PagesMap[Number(key) as PageWindows]} key={`page_window_tracker_${idx}`} keyObj={Number(key)} />
                ))}
            </div>
            {PagesMap[activeWindow].renderItem}
            <div className={`flex justify-end`}>
                <NextButton onClick={HandleWindowSwitch}>{t.general.continue}</NextButton>
            </div>
        </div>
    );
};