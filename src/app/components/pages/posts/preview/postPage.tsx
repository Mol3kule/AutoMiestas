'use client';

import { PostVehicle } from "@/types/post.type";
import { PostGeneralInfo } from "./PostGeneralInfo";
import { PostSecondaryInfo } from "./PostSecondaryInfo";
import { useImgPreviewStore } from "@/store/image_preview/imagePreview.store";
import { ImagePreviewModal } from "../../../modals/imagePreview";
import { useEffect } from "react";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { getVehicles } from "@/lib/getVehicles";
import { TVehicleMake, TVehicleModels } from "@/types/vehicle.type";
import { useRouter } from "next/navigation";

type PostPageProps = {
    post: PostVehicle;
    params: string[],
    phoneNumber: string;
}

export const PostPage = ({ post, params, phoneNumber }: PostPageProps) => {
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const { isPreviewActive } = useImgPreviewStore();

    const router = useRouter();

    useEffect(() => {
        if (!vehicleMakes.length || !vehicleModels.length) {
            getVehicles().then(async (res) => {
                const { makesData, modelsData }: { makesData: { status: number, data: TVehicleMake[] }, modelsData: { status: number, data: TVehicleModels[] } } = res;

                if (makesData.status === 200 && modelsData.status === 200) {
                    setMakes(makesData.data);
                    setModels(modelsData.data);
                    if (params[1] !== encodeURI(`${makesData.data.find(make => make.id === post.information.vehicleData.make)?.make}-${Object.values(modelsData.data[post.information.vehicleData.make]).find(model => model.id === post.information.vehicleData.model)?.model}-${post.information.vehicleData.year}`)) {
                        router.replace(`/posts/${post.id}/${encodeURI(`${makesData.data.find(make => make.id === post.information.vehicleData.make)?.make}-${Object.values(modelsData.data[post.information.vehicleData.make]).find(model => model.id === post.information.vehicleData.model)?.model}-${post.information.vehicleData.year}`)}/${post.periods.time_created}`);
                    }
                }
            });
        }
    }, []);

    return (
        <div>
            {post.isActive && post.isVerified ? (
                <>
                    <div className={`flex flex-col laptop:flex-row gap-[2.19rem] laptop:hidden`}>
                        <PostSecondaryInfo post={post} />
                        <PostGeneralInfo post={post} phoneNumber={phoneNumber} />
                    </div>
                    <div className={`hidden laptop:flex laptop:flex-row gap-[2.19rem]`}>
                        <PostGeneralInfo post={post} phoneNumber={phoneNumber} />
                        <PostSecondaryInfo post={post} />
                    </div>
                </>
            ) : (
                <div className={`flex items-center justify-center text-header_2xl`}>Skelbimas nepasiekiamas, laukiama administracijos patvirtinimo</div>
            )}
            {isPreviewActive && (
                <ImagePreviewModal images={post.images} />
            )}
        </div>
    )
}