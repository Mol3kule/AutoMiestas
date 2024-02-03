"use client";

import { getPostSlug } from "@/actions/posts/post.actions";
import { VehicleObj, getVehicleDataProps } from "@/classes/Vehicle";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Post } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const RenderVehicleLabel = ({ post }: { post: Post }) => {
    const { information } = post;
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const router = useRouter();

    const [getVehicleData, setVehicleData] = useState<getVehicleDataProps>(null!);

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) return;
        if ('vehicleData' in information) {
            const vehicleData = information.vehicleData;
            const vData = VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
            setVehicleData(vData);
        }
    }, [vehicleMakes, vehicleModels]);

    const RedirectToPost = async () => {
        const slug = await getPostSlug(post.id!);
        if (!slug) return toast.error('Failed to get post slug');
        router.push(`/posts/${slug}`);
    }

    return (
        getVehicleData ? (
            <span className={`text-base full_hd:text-base_2xl text-highlight hover:cursor-pointer`} onClick={RedirectToPost}>{getVehicleData.make?.make} {getVehicleData.model?.model}</span>
        ) : (
            'itemData' in information && (
                <span className={`text-base full_hd:text-base_2xl text-highlight hover:cursor-pointer`} onClick={RedirectToPost}>{information.title}</span>
            )
        )
    );
}