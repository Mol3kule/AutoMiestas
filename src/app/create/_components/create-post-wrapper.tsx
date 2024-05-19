'use client';

import { useState } from "react";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";

import { PostCategoriesPage } from "./categories-view";
import { PostInformationPage } from "./information-view";
import { PostPaymentPage } from "./payment-view";
import ErrorBox from "@/components/errorBox";
import { NextButton } from "@/components/buttons/nextButton";
import { VehicleObj } from "@/classes/Vehicle";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { UpdatePost } from "@/actions/posts/post.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

enum PageWindows { Category, Information, Payment };

type PageMapItem = {
    title: string;
    renderItem: JSX.Element;
};

export const CreatePostPage = ({ postData }: { postData: Post | null }) => {
    const [activeWindow, setActiveWindow] = useState<PageWindows>(postData ? PageWindows.Information : PageWindows.Category);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const {
        category, checkFields, checkFieldsItem, fillFieldsByPostData,
        makeId, modelId, modelYear, bodyType, mileage, mileage_type,
        fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due,
        vin, sdk, description, fileImages, primaryImg, countryId, cityId, specifications,
        ccm, power, power_type, title, partNumber, filledImages
    } = usePostCreateStore();

    const t = useLanguage();
    const router = useRouter();

    const { isLoading } = useQuery({
        queryKey: ["editPostFillData"],
        queryFn: async () => {
            if (!postData) return false;

            fillFieldsByPostData(postData);
            return true;
        },
        staleTime: Infinity
    });

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
            const { status, message } = Object.keys(VehicleObj.getAllTypes()).includes(category.toString()) ? checkFields() : checkFieldsItem();
            if (!status) {
                setErrorMessage(t.post.errors[message as keyof typeof t.post.errors]);
                ScrollToTop();
                return false;
            }
            setErrorMessage("");
        }

        return true;
    }

    const HandleWindowSwitch = async () => {
        if (activeWindow === PageWindows.Category) {
            setActiveWindow(PageWindows.Information);
            return;
        }

        if (isAllowedToSwitch(PageWindows.Payment) && (activeWindow === PageWindows.Information && postData)) {
            // Handle update
            const formData = new FormData();
            Promise.all(Object.values(fileImages).map((file, idx) => {
                const isPrimary = file.name === fileImages[primaryImg].name;
                formData.append(`${isPrimary ? `primary_img` : `file_${idx}`}`, file)
            }));

            const data = { category, makeId, modelId, modelYear, bodyType, mileage, mileage_type, fuelType, drivetrain, transmission, sw_side, condition, price, technical_inspection_due, vin, sdk, description, primaryImg, countryId, cityId, specifications, ccm, power, power_type, title, partNumber, formDataImages: formData, filledImages, oldSlug: postData.slug };
            const { status } = await UpdatePost(data);
            if (status !== 200) {
                router.push('/');
                return;
            }
            router.push(`/my_posts`);
            toast.success(`Skelbimas sėkmingai atnaujintas, skelbimas laukia administracijos patvirtinimo!`, { duration: 5000 });
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
                {Object.keys(PagesMap).map((key, idx) => {
                    if (Number(key) === PageWindows.Payment && postData) return;

                    return (
                        <RenderWindowItem item={PagesMap[Number(key) as PageWindows]} key={`page_window_tracker_${idx}`} keyObj={Number(key)} />
                    )
                })}
            </div>
            {PagesMap[activeWindow].renderItem}
            {activeWindow !== PageWindows.Payment &&
                <div className={`flex justify-end`}>
                    <NextButton onClick={HandleWindowSwitch}>{activeWindow === PageWindows.Information && postData ? `Išsaugoti` : t.general.continue}</NextButton>
                </div>
            }
        </div>
    );
};