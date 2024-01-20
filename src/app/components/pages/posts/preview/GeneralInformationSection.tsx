'use client';

import { VehicleObj } from "@/classes/Vehicle";
import { Skeleton } from "@/components/ui/skeleton";
import { getVehicles } from "@/lib/getVehicles";
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
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const [isLoading, setIsLoading] = useState(true);
    const t = useLanguage();

    useEffect(() => {
        if (!vehicleMakes.length || !vehicleModels.length) {
            getVehicles().then(async (res) => {
                const { makesData, modelsData } = res;

                if (makesData.status === 200 && modelsData.status === 200) {
                    setMakes(makesData.data);
                    setModels(modelsData.data);
                }
            });
        }
        setIsLoading(false);
    }, []);

    const RenderInfoItem = ({ objKey, item }: { objKey: string, item: any }) => {
        console.log(item)
        if (objKey.includes('type') || item === null) return null;
        const label = VehicleObj.getLabelByKeyAndIndex(t, objKey, item);


        return (
            vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 &&
            <div className={`flex gap-[1.25rem] justify-between text-base full_hd:text-base_2xl text-primary`}>
                <span>{t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}</span>
                <span>{objKey === 'mileage' ? label.toLocaleString() : objKey === 'make' ? vehicleMakes.find((car) => car.id === item)?.make : objKey === 'model' ? Object.values(vehicleModels[post.information.vehicleData.make]).find((car) => car.id === post.information.vehicleData.model)?.model : label}</span>
            </div>
        );
    }

    const RenderLoaded = () => (
        <div className={`flex flex-col gap-[0.88rem]`}>
            <div className={`flex flex-col justify-between gap-[1.25rem] w-full`}>
                {vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 && (
                    <div className={`flex gap-[0.2rem] flex-wrap overflow-hidden`}>
                        <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{vehicleMakes.find((car) => car.id === post.information.vehicleData.make)?.make}</span>
                        <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{Object.values(vehicleModels[post.information.vehicleData.make]).find((car) => car.id === post.information.vehicleData.model)?.model}</span>
                        <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}> {Object.values(vehicleModels[post.information.vehicleData.make]).find((car) => car.id === post.information.vehicleData.model)?.engine_l.toFixed(1)}l</span>
                    </div>
                )}

                <div className={`flex gap-[0.62rem] items-center`}>
                    <RenderLocationItem>{post.information.location.city}</RenderLocationItem>
                    <RenderLocationItem>{post.information.location.country}</RenderLocationItem>
                </div>
            </div>
            <hr className={`text-border bg-border`} />
        </div>
    );

    return (
        <div className={`flex flex-col gap-[0.88rem]`}>
            {!isLoading && <RenderLoaded />}
            <div className={`flex flex-col gap-[1.25rem]`}>
                {Object.keys(post?.information.vehicleData)?.map((key, index) => (
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
}