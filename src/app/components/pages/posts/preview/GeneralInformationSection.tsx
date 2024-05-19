'use client';

import { VehicleObj } from "@/classes/Vehicle";
import { Skeleton } from "@/shadcn-components/ui/skeleton";
import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Post } from "@/types/post.type";
import { useQuery } from "@tanstack/react-query";
import { PostVehicleDataInformation } from "@/types/posts/vehiclePost.type";
import { PostItemData } from "@/types/posts/postItem.type";

import Countries from "@/classes/Countries";
import Cities from "@/classes/Cities";

export const RenderLocationItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`px-[0.62rem] py-[0.25rem] bg-highlight rounded-[0.1875rem] items-center justify-center text-base full_hd:text-base_2xl text-[#FFF] text-center capitalize`}>
            {children}
        </div>
    );
}

export const GeneralInformationSection = ({ post }: { post: Post }) => {
    const { information } = post;
    const { vehicleMakes, vehicleModels } = useVehicleStore();
    const t = useLanguage();

    const { isLoading, data: getVehicleData } = useQuery({
        queryKey: ['getVehicleData', { vehicleMakes, vehicleModels }],
        queryFn: async () => {
            if (!vehicleMakes.length || !Object.values(vehicleModels).length) return null;

            if ('vehicleData' in information) {
                const vehicleData = information.vehicleData;
                return VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
            }
            return null;
        },
        staleTime: Infinity
    });

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
    const RenderInfoItem = ({ objKey, item }: { objKey: string, item: any }) => {
        if (objKey.includes('type') || objKey.includes('ratingByAuthor') || item === null) return null;
        const label = VehicleObj.getLabelByKeyAndIndex(t, objKey, item);
        return (
            !isLoading && (
                getVehicleData && 'vehicleData' in information ? (
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
                                    <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]} (${information.vehicleData.mileage_type})`} value={Number(label).toLocaleString()} />
                                )}
                                {objKey === 'ccm' && (
                                    <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={`${Number(item).toLocaleString()}`} />
                                )}
                                {objKey === 'power' && (
                                    <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]} (${information.vehicleData.power_type})`} value={`${Number(item).toLocaleString()}`} />
                                )}
                            </>
                        ) : (
                            <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={label} />
                        )}
                    </div>
                ) : (
                    <div className={`flex gap-[1.25rem] justify-between text-base full_hd:text-base_2xl text-primary`}>
                        <RenderInfoItemLabels title={`${t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}`} value={label} />
                    </div>
                )
            )
        );
    }

    const RenderLoaded = () => (
        <div className={`flex flex-col gap-[0.88rem]`}>
            <div className={`flex flex-col justify-between gap-[1.25rem] w-full`}>
                {!isLoading && (
                    getVehicleData && 'vehicleData' in information ? (
                        <div className={`flex gap-[0.2rem] flex-wrap overflow-hidden`}>
                            <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{getVehicleData.make?.make}</span>
                            <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{getVehicleData.model?.model}</span>
                        </div>
                    ) : (
                        'itemData' in information && (
                            <div className={`flex gap-[0.2rem] flex-wrap overflow-hidden`}>
                                <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{information.title}</span>
                            </div>
                        )
                    )
                )}

                <div className={`flex gap-[0.62rem] items-center`}>
                    <RenderLocationItem>{Countries.getCountryByIndex(Number(information.location.countryId))}</RenderLocationItem>
                    <RenderLocationItem>{Cities.getCityByIndex(information.location.countryId, Number(information.location.cityId))}</RenderLocationItem>
                </div>
            </div>
            <hr className={`text-border bg-border`} />
        </div>
    );

    return (
        <div className={`flex flex-col gap-[0.88rem]`}>
            {!isLoading && <RenderLoaded />}
            <div className={`flex flex-col gap-[1.25rem]`}>
                {'vehicleData' in information ? (
                    Object.keys(information.vehicleData).map((key, index) => (
                        !isLoading && vehicleMakes.length > 0 ? (
                            <RenderInfoItem objKey={key} item={information.vehicleData[key as keyof PostVehicleDataInformation]} key={index} />
                        ) : (
                            <Skeleton key={index} className={`flex bg-highlight_secondary w-full py-[1rem]`} />
                        )
                    ))
                ) : (
                    <>
                        {Object.keys(information.itemData).map((key, index) => (
                            !isLoading && vehicleMakes.length > 0 ? (
                                <RenderInfoItem objKey={key} item={information.itemData[key as keyof PostItemData]} key={index} />
                            ) : (
                                <Skeleton key={index} className={`flex bg-highlight_secondary w-full py-[1rem]`} />
                            )
                        ))}
                        <div className={`flex gap-[1.25rem] justify-between text-base full_hd:text-base_2xl text-primary`}>
                            <RenderInfoItemLabels title={`${t.general.price}`} value={information.price.toLocaleString()} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};