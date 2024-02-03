'use client';

import { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

import { ILocationCity, useCityStateStore } from "@/store/citystate/citystate.store";
import { usePostCreateStore } from "@/store/posts/postCreate.store";

import { PostCreateInputText, PostCreateSelectInputSearchable } from "@/components/inputs/postCreateInput";
import { useLanguage } from "@/lib/languageUtils";
import { getCityState } from "@/lib/getCityState";
import { Star, Trash2, Upload } from "lucide-react";


export const PostGeneralInformationSection = ({ children }: { children: React.ReactNode }) => {
    const t = useLanguage();

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.generalInfo}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.generalInfo_description}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-3 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                {children}
            </div>
        </div>
    );
};

export const PostAdditionalInformationSection = ({ children }: { children: React.ReactNode }) => {
    const t = useLanguage();

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.additionalInfo}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.additionalInfo_description}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-3 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                {children}
            </div>
        </div>
    );
};

export const PostDescriptionSection = () => {
    const { description, setDescription } = usePostCreateStore();
    const t = useLanguage();
    const limit = 1000;

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.description}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.description_description}</span>
            </div>
            <div className={`flex flex-col p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem] h-[15.25rem]`}>
                <textarea
                    className={`bg-[#FFF] w-full h-full resize-none focus:outline-none rounded-[0.1875rem] px-[1.56rem] py-[1.25rem] text-base full_hd:text-base_2xl placeholder:text-placeholder`}
                    placeholder={t.post.labels.description}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description !== null ? description : ``}
                    maxLength={limit}
                />
            </div>
            <span className={`text-sm full_hd:text-sm_2xl text-end`}>{t.post.labels.symbols_left} {description !== null ? limit - description.length : limit - 0}</span>
        </div>
    );
};


export const PostImagesSection = () => {
    const t = useLanguage();

    const fileInput = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState([]);

    const { fileImages, primaryImg, setPrimaryImg, setFileImages } = usePostCreateStore();

    useEffect(() => {
        const newImages: any = [...images];
        Object.values(fileImages).forEach((file) => {
            newImages.push({
                url: URL.createObjectURL(file)
            });
        });
        setImages(newImages);
    }, []);

    const RenderImage = ({ item, idx }: { item: any, idx: number }) => {
        const HandleImageRemove = () => {
            const newImages = [...images];
            newImages.splice(idx, 1);
            setImages(newImages);

            const newFiles = [...fileImages];
            newFiles.splice(idx, 1);
            setFileImages(newFiles);

            if (newImages.length > 0) {
                setPrimaryImg(0);
            } else if (!newImages.length) {
                setPrimaryImg(null!);
            }
        }

        const HandlePrimarySelect = () => {
            setPrimaryImg(idx);
        }

        return (
            <div className={`relative flex w-full h-[6.3125rem] full_hd:h-[10.3125rem] items-center justify-center`}>
                <Star className={`left-[0.5rem] top-[0.5rem] w-[1.5rem] h-[1.5rem] absolute hover:cursor-pointer ${primaryImg === idx ? `text-highlight` : `text-[#FFF]`}`} onClick={HandlePrimarySelect} />
                <Trash2 className={`w-[1.5rem] h-[1.5rem] absolute text-[#FFF] hover:cursor-pointer`} onClick={HandleImageRemove} />
                <Image
                    src={item.url}
                    alt={'Uploaded img'}
                    className={`w-full h-full object-cover`}
                    width={1920}
                    height={1080}
                />
            </div>
        )
    }

    const maxSizeInBytes = 8 * 1024 * 1024; // 8MB
    const supportedImageTypes = ['image/jpeg', 'image/png'];
    const handleImageUpload = (target: HTMLInputElement) => {
        const { files } = target;

        if (!files || files.length <= 0) {
            setImages([]);
            setFileImages([]);
            return;
        }

        const formData = new FormData();
        const newImages: any = [...images];
        Object.values(files).map((file, idx) => {
            if (!supportedImageTypes.includes(file.type)) return; // if file type not supported
            if (newImages.length >= 12) return; // if images length is more than 12
            if (file.size > maxSizeInBytes) return; // if file size too big

            newImages.push({
                url: URL.createObjectURL(file)
            });
            formData.append(`file_${idx}`, file)
        });

        if (newImages.length === images.length) return;
        setFileImages([...fileImages, ...Array.from(files)]);
        setImages(newImages);

        if (primaryImg === null) {
            setPrimaryImg(0);
        }
    };

    const HandleOpenFileMenu = () => {
        fileInput?.current?.click();
    };

    return (
        <form className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.images}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.images_description}</span>
            </div>
            <div className={`flex flex-col gap-[1.25rem]`}>
                <div className={`w-full grid grid-cols-3 gap-[1.25rem] laptop:grid-cols-8`}>
                    {images.map((image, idx) => (
                        <RenderImage item={image} key={`img_upload_${idx}`} idx={idx} />
                    ))}
                </div>
                <div className={`flex flex-col gap-[1rem] w-full border-placeholder border-[1px] py-[3rem] rounded-[0.1875rem] border-dashed items-center justify-center text-center`} onClick={HandleOpenFileMenu}>
                    <Upload className={`w-[3.5rem] h-[3.5rem] text-highlight`} />
                    <input
                        type="file"
                        name="files"
                        accept="image/jpeg,image/png"
                        multiple
                        max={10}
                        onChange={(e) => handleImageUpload(e.target)}
                        className="invisible"
                        ref={fileInput}
                    />
                    <div className={`flex flex-col gap-[0.2rem] `}>
                        <span className={`text-highlight text-sm full_hd:text-sm_2xl`}>Pasirinkite nuotraukas</span>
                        <span className={`text-highlight text-base full_hd:text-base_2xl`}>Daugiausiai 12 nuotraukų. Dydis - 8MB</span>
                    </div>
                </div>
            </div>
        </form>
    );
};

export const PostLocationSection = () => {
    const t = useLanguage();

    const { user } = useUser();

    const { CountryList, CityList, setCountryList, setCityList } = useCityStateStore();
    const { countryId, cityId, setCountryId, setCityId } = usePostCreateStore();

    useEffect(() => {
        if (CountryList.length > 0 || CityList.length > 0) return;

        const { Countries, Cities } = getCityState(); // Utility
        setCountryList(Countries);
        setCityList(Cities as unknown as ILocationCity[]);
    }, []);

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.contacts}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.contacts_description}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-2 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <PostCreateSelectInputSearchable
                    label={t.general.country}
                    value={countryId !== null ? countryId.toString() : ``}
                    setValue={(value) => setCountryId(Number(value))}
                    items={CountryList && CountryList.map((item) => ({ id: item.id.toString(), label: item.name }))}
                />
                <PostCreateSelectInputSearchable
                    label={t.general.city}
                    value={cityId ? cityId.toString() : ``}
                    setValue={(value) => setCityId(Number(value))}
                    items={countryId !== null ? Object.values(CityList[countryId]).map((item) => ({ id: item.id.toString(), label: item.name })) : []}
                    isDisabled={countryId === null}
                />
                <PostCreateInputText
                    label={t.profile.phone}
                    isDisabled={true}
                    value={user ? user.primaryPhoneNumber?.phoneNumber ?? `` : ``}
                />
            </div>
        </div>
    );
};