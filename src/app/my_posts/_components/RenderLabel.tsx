"use client";

import { VehicleObj, getVehicleDataProps } from "@/classes/Vehicle";
import { getPostUrl } from "@/lib/getPostUrl";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { PostVehicle } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const RenderVehicleLabel = ({ post }: { post: PostVehicle }) => {
    const { information: { vehicleData } } = post;
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const router = useRouter();

    const [getVehicleData, setVehicleData] = useState<getVehicleDataProps>(null!);

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) return;

        const vData = VehicleObj.getVehicleDataByIdx(vehicleMakes, vehicleModels, vehicleData.make, vehicleData.model, vehicleData.body_type, vehicleData.condition, vehicleData.fuel_type, vehicleData.drive_train, vehicleData.transmission, vehicleData.sw_side);
        setVehicleData(vData);
    }, [vehicleMakes, vehicleModels]);

    const RedirectToPost = () => {
        const url = getPostUrl({ vehicleMakes, vehicleModels, post });
        router.push(url);
    }

    return (
        getVehicleData && (
            <span className={`text-base full_hd:text-base_2xl text-highlight hover:cursor-pointer`} onClick={RedirectToPost}>{getVehicleData.make?.make} {getVehicleData.model?.model}</span>
        )
    );
}