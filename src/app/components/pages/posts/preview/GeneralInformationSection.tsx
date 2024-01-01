'use client';

import { VehicleObj } from "@/classes/Vehicle";
import { useLanguage } from "@/lib/languageUtils";
import { Post, PostVehicleDataInformation } from "@/types/post.type";
import { ShieldCheck } from "lucide-react";

const HiddenKeys = ['type'];

export const RenderLocationItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`px-[0.62rem] py-[0.25rem] bg-highlight rounded-[6.25rem] items-center justify-center text-base full_hd:text-base_2xl text-[#FFF] text-center capitalize`}>
            {children}
        </div>
    );
}

export const GeneralInformationSection = ({ post }: { post: Post }) => {
    const t = useLanguage();

    const RenderInfoItem = ({ objKey, item }: { objKey: string, item: any }) => {
        if (HiddenKeys.includes(objKey)) return null;
        const label = VehicleObj.getLabelByKeyAndIndex(t, objKey, item);

        return (
            <div className={`flex gap-[1.25rem] justify-between text-base full_hd:text-base_2xl text-primary`}>
                <span>{t.vehicleInfo.objKeys[objKey as keyof typeof t.vehicleInfo.objKeys]}</span>
                <span>{objKey === 'mileage' ? `${label.toLocaleString()}` : label}</span>
            </div>
        );
    }

    return (
        <div className={`flex flex-col gap-[0.88rem]`}>
            <div className={`flex flex-col gap-[0.88rem]`}>
                <span className={`text-primary font-medium text-header full_hd:text-header_2xl`}>{post.information.vehicleData.make} {post.information.vehicleData.model}</span>
                <div className={`flex gap-[0.63rem] items-center`}>
                    <ShieldCheck className={`text-highlight w-[0.8125rem] h-[0.8125rem] full_hd:w-[1.25rem] full_hd:h-[1.25rem]`} />
                    <span className={`text-base full_hd:text-base_2xl text-primary`}>Patvirtinta pardavėjo tapatybė</span>
                </div>
                <div className={`flex gap-[0.62rem]`}>
                    <RenderLocationItem>{post.information.location.city}</RenderLocationItem>
                    <RenderLocationItem>{post.information.location.country}</RenderLocationItem>
                </div>
                <hr className={`text-border bg-border`} />
            </div>
            <div className={`flex flex-col gap-[1.25rem]`}>
                {Object.keys(post?.information.vehicleData).map((key, index) => (
                    <RenderInfoItem objKey={key} item={post.information.vehicleData[key as keyof PostVehicleDataInformation]} key={index} />
                ))}
            </div>
        </div>
    );
}