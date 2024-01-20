'use client';

import { useEffect, useState } from "react";
import { PostCategoriesPage } from "./_components/categoriesPage";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { PostInformationPage } from "./_components/informationPage";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { PostPaymentPage } from "./_components/paymentPage";
import ErrorBox from "@/app/components/errorBox";

enum PageWindows { Category, Information, Payment };

type PageMapItem = {
    title: string;
    renderItem: JSX.Element;
};

export const CreatePostPage = ({ allMakes }: { allMakes: any }) => {
    const t = useLanguage();
    const { category, makeId, modelId, modelYear, bodyType, mileage, fuelType, drivetrain, transmission, sw_side, condition, price, vin, sdk, description, fileImages } = usePostCreateStore();
    const { setMakes } = useVehicleStore();
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
        [PageWindows.Payment]: {
            title: 'Paslaugų apmokėjimas',
            renderItem: <PostPaymentPage />
        }
    };

    const isAllowedToSwitch = (targetPage: PageWindows) => {
        setErrorMessage(""); // Clear error message

        if (targetPage === PageWindows.Information) {
            if (category === null) {
                setActiveWindow(PageWindows.Category);
                setErrorMessage(t.post.errors.category_not_selected);
                return false;
            }
        }

        if (targetPage === PageWindows.Payment) {
            if (makeId === null) {
                setErrorMessage(t.post.errors.make_not_selected);
                return false;
            }

            if (modelId === null) {
                setErrorMessage(t.post.errors.model_not_selected);
                return false;
            }

            if (modelYear === null) {
                setErrorMessage(t.post.errors.year_not_selected);
                return false;
            }

            if (bodyType === null) {
                setErrorMessage(t.post.errors.body_type_not_selected);
                return false;
            }

            if (mileage === null) {
                setErrorMessage(t.post.errors.mileage_not_selected);
                return false;
            }

            if (fuelType === null) {
                setErrorMessage(t.post.errors.fuel_type_not_selected);
                return false;
            }

            if (drivetrain === null) {
                setErrorMessage(t.post.errors.drivetrain_not_selected);
                return false;
            }

            if (transmission === null) {
                setErrorMessage(t.post.errors.transmission_not_selected);
                return false;
            }

            if (sw_side === null) {
                setErrorMessage(t.post.errors.sw_side_not_selected);
                return false;
            }

            if (condition === null) {
                setErrorMessage(t.post.errors.condition_not_selected);
                return false;
            }

            if (price === null) {
                setErrorMessage(t.post.errors.price_not_selected);
                return false;
            }

            if (fileImages.length < 4) {
                console.log(fileImages)
                setErrorMessage(t.post.errors.images_not_selected);
                return;
            }
        }


        return true;
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
        </div>
    );
};