'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PostCreateInputText, PostCreateSelectInput, PostCreateSelectInputSearchable } from "@/app/components/inputs/postCreateInput";
import { PostObj } from "@/classes/PostCategories";
import { useLanguage } from "@/lib/languageUtils";
import { usePostCreateStore } from "@/store/posts/postCreate.store";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { VehicleObj } from "@/classes/Vehicle";
import { getCityState } from "@/lib/getCityState";
import { ILocationCity, useCityStateStore } from "@/store/citystate/citystate.store";
import { Star, Trash2, Upload } from "lucide-react";

export const CreateVehiclePostForm = () => {
    return (
        <>
            <CreateVehiclePostFormGeneralInformation />
            <hr className={`w-full text-border bg-border`} />
            <CreateVehiclePostFormAdditionalInformation />
            <hr className={`w-full text-border bg-border`} />
            <CreateVehiclePostFormDescription />
            <hr className={`w-full text-border bg-border`} />
            <CreateVehiclePostFormImages />
            <hr className={`w-full text-border bg-border`} />
            <CreateVehiclePostFormSpecifications />
            <hr className={`w-full text-border bg-border`} />
            <CreateVehiclePostFormLocation />
        </>
    );
}

export const CreateVehiclePostFormGeneralInformation = () => {
    const t = useLanguage();
    const { category, makeId, modelId, modelYear, bodyType, mileage, fuelType, drivetrain, transmission, sw_side, price, condition, setMakeId, setModelId, setModelYear, setBodyType, setMileage, setFuelType, setDrivetrain, setTransmission, setSteeringWheelSide, setPrice, setCondition } = usePostCreateStore();
    const { vehicleMakes, vehicleModels, setModels } = useVehicleStore(); // Global store

    useEffect(() => {
        if (Object.keys(vehicleModels).length > 0) return;

        fetch(`${process.env.defaultApiEndpoint}/api/vehicles/getAllModels`, {
            method: 'GET',
        }).then(async (res) => {
            const { data } = await res.json();
            setModels(data);
        }).catch((err) => console.log(err));
    }, []);

    const MakeOnChange = (newValue: string) => {
        setMakeId(Number(newValue));
        setModelId(null!);
        setModelYear(null!);
    };

    const ModelOnChange = (newValue: string) => {
        setModelId(Number(newValue));
        setModelYear(null!);
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.generalInfo}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.generalInfo_description}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-3 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <PostCreateInputText
                    label={t.vehicleInfo.objKeys.type}
                    isDisabled={true}
                    value={t.post.categories[PostObj.getLabelByIndex(category) as keyof typeof t.post.categories]}
                />
                <PostCreateSelectInputSearchable
                    label={t.vehicleInfo.objKeys.make}
                    value={makeId !== null ? makeId.toString() : ``}
                    placeholder={`----`}
                    items={vehicleMakes ? vehicleMakes.map((item) => ({ id: item.id.toString(), label: item.make })) : []}
                    setValue={MakeOnChange}
                    compareToId={false}
                />
                <PostCreateSelectInputSearchable
                    label={t.vehicleInfo.objKeys.model}
                    value={modelId !== null ? modelId.toString() : ``}
                    placeholder={`----`}
                    items={makeId !== null ? Object.values(vehicleModels[makeId])?.map((value) => ({ id: value.id.toString(), label: value.model })) ?? [] : []}
                    setValue={ModelOnChange}
                    isDisabled={makeId === null}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.year}
                    value={modelYear !== null && modelId !== null ? modelYear.toString() : ``}
                    items={makeId !== null && modelId !== null ? Object.values(vehicleModels[makeId]).find((model) => model.id === modelId)?.year.map((year, idx) => ({ id: year?.toString()!, label: year?.toString() as string })) ?? [] : []}
                    setValue={(value) => setModelYear(Number(value))}
                    isDisabled={modelId === null}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.body_type}
                    value={bodyType !== null ? bodyType.toString() : ``}
                    items={Object.keys(VehicleObj.getAllBodyTypes()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.body_type[VehicleObj.getBodyTypeByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.body_type] }))}
                    setValue={(value) => setBodyType(Number(value))}
                />
                <PostCreateInputText
                    label={t.vehicleInfo.objKeys.mileage}
                    value={mileage ? mileage.toString() : ``}
                    setValue={(value) => setMileage(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.fuel_type}
                    value={fuelType !== null ? fuelType.toString() : ``}
                    items={Object.keys(VehicleObj.getAllFuelTypes()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.fuelTypes[VehicleObj.getFuelTypeByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.fuelTypes] }))}
                    setValue={(value) => setFuelType(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.drive_train}
                    value={drivetrain !== null ? drivetrain.toString() : ``}
                    items={Object.keys(VehicleObj.getAllDrivetrains()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.drivetrains[VehicleObj.getDrivetrainByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.drivetrains] }))}
                    setValue={(value) => setDrivetrain(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.transmission}
                    value={transmission !== null ? transmission.toString() : ``}
                    items={Object.keys(VehicleObj.getAllTransmissions()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.transmission[VehicleObj.getTransmissionByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.transmission] }))}
                    setValue={(value) => setTransmission(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.sw_side}
                    value={sw_side !== null ? sw_side.toString() : ``}
                    items={Object.keys(VehicleObj.getAllSteeringWheelSides()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.sw_side[VehicleObj.getSteeringWheelSideByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.sw_side] }))}
                    setValue={(value) => setSteeringWheelSide(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.vehicleInfo.objKeys.condition}
                    value={condition !== null ? condition.toString() : ``}
                    items={Object.keys(VehicleObj.getAllConditions()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.conditions[VehicleObj.getConditionByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.conditions] }))}
                    setValue={(value) => setCondition(Number(value))}
                />
                <PostCreateInputText
                    label={t.general.price}
                    value={price ? price.toString() : ``}
                    setValue={(value) => setPrice(Number(value))}
                />
            </div>
        </div>
    );
};

export const CreateVehiclePostFormAdditionalInformation = () => {
    const t = useLanguage();
    const { technical_inspection_due, sdk, vin, setTechnicalInspectionDue, setSDK, setVin } = usePostCreateStore();

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.additionalInfo}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.additionalInfo_description}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-3 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <div className={`flex flex-col gap-[0.85rem]`}>
                    <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.objKeys.technical_inspection_due_to}</span>
                    <input
                        type={`date`}
                        minLength={17}
                        maxLength={17}
                        className={`bg-[#FFF] w-[100%] rounded-[0.1875rem] px-[1.56rem] py-[0.69rem] text-base full_hd:text-base_2xl focus:outline-none placeholder:text-placeholder uppercase`}
                        value={technical_inspection_due !== null ? technical_inspection_due : ``}
                        placeholder="----"
                        onChange={(e) => setTechnicalInspectionDue(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col gap-[0.85rem]`}>
                    <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.objKeys.vin}</span>
                    <input
                        type={`text`}
                        minLength={17}
                        maxLength={17}
                        className={`bg-[#FFF] min-w-full rounded-[0.1875rem] px-[1.56rem] py-[0.69rem] text-base full_hd:text-base_2xl focus:outline-none placeholder:text-placeholder uppercase`}
                        value={vin !== null ? vin : ``}
                        placeholder="----"
                        onChange={(e) => setVin(e.target.value)}
                    />
                </div>
                <div className={`flex flex-col gap-[0.85rem]`}>
                    <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.objKeys.sdk}</span>
                    <input
                        type={`text`}
                        minLength={8}
                        maxLength={8}
                        className={`bg-[#FFF] min-w-full rounded-[0.1875rem] px-[1.56rem] py-[0.69rem] text-base full_hd:text-base_2xl focus:outline-none placeholder:text-placeholder uppercase`}
                        value={sdk !== null ? sdk : ``}
                        placeholder="----"
                        onChange={(e) => setSDK(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export const CreateVehiclePostFormDescription = () => {
    const t = useLanguage();

    const limit = 1000;
    const { description, setDescription } = usePostCreateStore();

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
    )
};


export const CreateVehiclePostFormImages = () => {
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
    }

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
    )
}

const CreateVehiclePostFormSpecifications = () => {
    const t = useLanguage();

    const { specifications, setSpecifications } = usePostCreateStore();

    const RenderRatingItem = ({ value }: { value: number }) => {
        const setNewRating = (newValue: number) => {
            const newSpecifications = { ...specifications };
            newSpecifications[value as keyof typeof specifications] = newValue;
            setSpecifications(newSpecifications);
        };

        return (
            <div className={`flex flex-col gap-[0.88rem]`} >
                <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.vehicleInfo.rating[VehicleObj.getRatingByIndex(value) as keyof typeof t.vehicleInfo.rating]}</span>

                <div className={`flex gap-[0.63rem]`}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div onClick={() => setNewRating(i + 1)} className={`w-full h-[0.625rem] full_hd:h-[0.813rem] rounded-[0.125rem] hover:cursor-pointer ${specifications[value as keyof typeof specifications] > i ? `bg-highlight` : `bg-border`}`} key={`v_rating_${i}`}></div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.87rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>{t.post.labels.specifications}</span>
                <span className={`text-placeholder_secondary`}>{`Kaip vertinate savo automobilio kondiciją? Pažymėkite visus laukus`}</span>
            </div>
            <div className={`flex flex-col gap-[1.25rem]`}>
                {Object.keys(VehicleObj.getAllRatings()).map((value) => (
                    <RenderRatingItem value={Number(value)} key={`rating_item_${value}`} />
                ))}
            </div>
        </div>
    )
}

const CreateVehiclePostFormLocation = () => {
    const t = useLanguage();

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
                <span className={`text-primary`}>{t.post.labels.location}</span>
                <span className={`text-placeholder_secondary`}>{t.post.labels.location_description}</span>
            </div>
            <div className={`grid grid-cols-2 p-[2.19rem] gap-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
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
                />
            </div>
        </div>
    )
}