'use client';

import { VehicleObj, getVehicleDataProps } from "@/classes/Vehicle";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { PostVehicle, PostVehicleDataInformation } from "@/types/post.type";
import { useEffect, useState } from "react";

export const RenderLocationItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`px-[0.62rem] py-[0.25rem] bg-highlight rounded-[0.1875rem] items-center justify-center text-base full_hd:text-base_2xl text-[#FFF] text-center capitalize`}>
            {children}
        </div>
    );
}

export const GeneralInformationSection = ({ post }: { post: PostVehicle }) => {
    const { information: { vehicleData, location } } = post;
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const [isLoading, setIsLoading] = useState(true);
    const t = useLanguage();

    const [getVehicleData, setVehicleData] = useState<getVehicleDataProps>(null!);

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) return;
        const getVehicleData = VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
        setVehicleData(getVehicleData);
        setIsLoading(false);

        // console.log(vehicleData)
    }, [vehicleMakes, vehicleModels]);

    const RenderInfoItemLabels = ({ title, value }: { title: string, value: string | number }) => {
        return (
            <>
                <div className={`flex gap-[0.3rem]`}>
                    <span>{title}</span>
                </div>
                <span>{value}</span>
            </>
        )
    }

    const CustomObjects = ['make', 'model', 'mileage', 'ccm', 'power'];
    const RenderInfoItem = ({ objKey, item }: { objKey: string, item: string | number | null }) => {
        if (objKey.includes('type') || item === null) return null;
        const label = VehicleObj.getLabelByKeyAndIndex(t, objKey, item);

        return (
            getVehicleData && (
                <div className={`flex gap-[1.25rem] justify-between text-base full_hd:text-base_2xl text-primary`}>
                    {CustomObjects.includes(objKey) ? (
                        <>
                            {objKey === 'make' && (
                                <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={getVehicleData.make?.make!} />
                            )}
                            {objKey === 'model' && (
                                <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={getVehicleData.model?.model!} />
                            )}
                            {objKey === 'mileage' && (
                                <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]} (${vehicleData.mileage_type})`} value={Number(label).toLocaleString()} />
                            )}
                            {objKey === 'ccm' && (
                                <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={`${Number(item).toLocaleString()}`} />
                            )}
                            {objKey === 'power' && (
                                <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]} (${vehicleData.power_type})`} value={`${Number(item).toLocaleString()}`} />
                            )}
                        </>
                    ) : (
                        <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={label} />
                    )}
                </div>
            )
        );
    }

    const RenderLoaded = () => (
        <div className={`flex flex-col gap-[0.88rem]`}>
            <div className={`flex flex-col justify-between gap-[1.25rem] w-full`}>
                {getVehicleData && (
                    <div className={`flex gap-[0.2rem] flex-wrap overflow-hidden`}>
                        <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{getVehicleData.make?.make}</span>
                        <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{getVehicleData.model?.model}</span>
                    </div>
                )}

                <div className={`flex gap-[0.62rem] items-center`}>
                    <RenderLocationItem>{location.city}</RenderLocationItem>
                    <RenderLocationItem>{location.country}</RenderLocationItem>
                </div>
            </div>
            <hr className={`text-border bg-border`} />
        </div>
    );

    return (
        <div className={`flex flex-col gap-[0.88rem]`}>
            {!isLoading && <RenderLoaded />}
            <div className={`flex flex-col gap-[1.25rem]`}>
                {Object.keys(vehicleData)?.map((key, index) => (
                    isLoading && post.information.vehicleData[key as keyof PostVehicleDataInformation] !== null ? (
                        <Skeleton key={index} className={`flex bg-highlight_secondary w-full py-[1rem]`} />
                    ) : (
                        vehicleMakes.length > 0 && (
                            <RenderInfoItem objKey={key} item={post.information.vehicleData[key as keyof PostVehicleDataInformation]} key={index} />
                        )
                    )
                ))}
            </div>
        </div>
    );
};