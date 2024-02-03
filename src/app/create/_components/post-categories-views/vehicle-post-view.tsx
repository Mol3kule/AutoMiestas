import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { usePostCreateStore } from "@/store/posts/postCreate.store";

import { PostAdditionalInformationSection, PostDescriptionSection, PostGeneralInformationSection, PostImagesSection, PostLocationSection } from "./post-view-wrapper";
import { PostCreateInputText, PostCreateSelectInput, PostCreateSelectInputSearchable } from "@/components/inputs/postCreateInput";
import { PostObj } from "@/classes/PostCategories";
import { VehicleObj } from "@/classes/Vehicle";

export const VehiclePostView = () => {
    return (
        <>
            <GeneralSection />
            <hr className={`w-full text-border bg-border`} />
            <AdditionalInformation />
            <hr className={`w-full text-border bg-border`} />
            <PostDescriptionSection />
            <hr className={`w-full text-border bg-border`} />
            <PostImagesSection />
            <hr className={`w-full text-border bg-border`} />
            <InformationSpecifications />
            <hr className={`w-full text-border bg-border`} />
            <PostLocationSection />
            <hr className={`w-full text-border bg-border`} />
        </>
    );
};

const GeneralSection = () => {
    const { category, makeId, modelId, modelYear, bodyType,
        mileage, fuelType, drivetrain, transmission, sw_side, price, condition, ccm, power, mileage_type, power_type,
        setMakeId, setModelId, setModelYear, setBodyType, setMileage,
        setFuelType, setDrivetrain, setTransmission, setSteeringWheelSide, setPrice,
        setCondition, setCCM, setPower, setMileageType, setPowerType
    } = usePostCreateStore();
    const { vehicleMakes, vehicleModels } = useVehicleStore();
    const t = useLanguage();

    const MakeOnChange = (newValue: string) => {
        setMakeId(Number(newValue));
        setModelId(null!);
        setModelYear(null!);
    };

    const ModelOnChange = (newValue: string) => {
        setModelId(Number(newValue));
        setModelYear(null!);
    };

    return (
        <PostGeneralInformationSection>
            <PostCreateInputText
                label={t.vehicleInfo.objKeys.type}
                isDisabled={true}
                value={t.post.categories[PostObj.getLabelByIndex(category) as keyof typeof t.post.categories]}
            />
            <PostCreateSelectInputSearchable
                label={t.vehicleInfo.objKeys.make}
                value={makeId !== null ? makeId.toString() : ``}
                placeholder={`----`}
                items={vehicleMakes ? vehicleMakes.filter((item) => item.type.includes(category)).map((item) => ({ id: item.id.toString(), label: item.make })) : []}
                setValue={MakeOnChange}
                compareToId={false}
            />
            <PostCreateSelectInputSearchable
                label={t.vehicleInfo.objKeys.model}
                value={modelId !== null ? modelId.toString() : ``}
                placeholder={`----`}
                items={makeId !== null ? Object.values(vehicleModels[makeId])?.filter((item) => item.type.includes(category)).map((value) => ({ id: value.id.toString(), label: value.model })) ?? [] : []}
                setValue={ModelOnChange}
                isDisabled={makeId === null}
            />
            <PostCreateSelectInput
                label={t.vehicleInfo.objKeys.year}
                value={modelYear !== null && modelId !== null ? modelYear.toString() : ``}
                items={Array.from({ length: new Date().getFullYear() - 1929 }, (_, index) => ({ id: (index + 1930).toString(), label: (index + 1930).toString() }))}
                setValue={(value) => setModelYear(Number(value))}
                isDisabled={modelId === null}
            />
            <PostCreateSelectInput
                label={t.vehicleInfo.objKeys.body_type}
                value={bodyType !== null ? bodyType.toString() : ``}
                items={Object.keys(VehicleObj.getAllBodyTypes()).map((keyIdx) => ({ id: keyIdx, label: t.vehicleInfo.body_type[VehicleObj.getBodyTypeByIndex(Number(keyIdx)) as keyof typeof t.vehicleInfo.body_type] }))}
                setValue={(value) => setBodyType(Number(value))}
            />
            <div className={`flex gap-[1.25rem] flex-wrap laptop:flex-nowrap`}>
                <PostCreateInputText
                    label={t.vehicleInfo.objKeys.mileage}
                    value={mileage ? mileage.toString() : ``}
                    setValue={(value) => setMileage(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.post.labels.mileage_type}
                    value={Object.values(VehicleObj.getAllMileageTypes()).findIndex(item => item === mileage_type).toString()}
                    items={Object.values(VehicleObj.getAllMileageTypes()).map((item, idx) => ({ id: idx.toString(), label: t.post.labels[`mileage_${item}` as keyof typeof t.post.labels].toString() }))}
                    setValue={(value) => setMileageType(VehicleObj.getMileageTypeByIndex(Number(value)))}
                />
            </div>
            <PostCreateInputText
                label={t.post.labels.ccm}
                value={ccm ? ccm.toString() : ``}
                setValue={(value) => setCCM(Number(value))}
            />
            <div className={`flex gap-[1.25rem] flex-wrap laptop:flex-nowrap`}>
                <PostCreateInputText
                    label={t.post.labels.power}
                    value={power ? power.toString() : ``}
                    setValue={(value) => setPower(Number(value))}
                />
                <PostCreateSelectInput
                    label={t.post.labels.power_type}
                    value={Object.values(VehicleObj.getAllPowerTypes()).findIndex(item => item === power_type).toString()}
                    items={Object.values(VehicleObj.getAllPowerTypes()).map((item, idx) => ({ id: idx.toString(), label: t.post.labels[`power_${item}` as keyof typeof t.post.labels].toString() }))}
                    setValue={(value) => setPowerType(VehicleObj.getPowerTypeByIndex(Number(value)))}
                />
            </div>
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
        </PostGeneralInformationSection>
    );
};

const AdditionalInformation = () => {
    const t = useLanguage();
    const { technical_inspection_due, sdk, vin, setTechnicalInspectionDue, setSDK, setVin } = usePostCreateStore();

    return (
        <PostAdditionalInformationSection>
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
        </PostAdditionalInformationSection>
    );
};

const InformationSpecifications = () => {
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