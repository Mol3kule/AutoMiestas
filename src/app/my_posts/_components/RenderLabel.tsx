"use client";

import { getVehicles } from "@/lib/getVehicles";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { PostVehicle } from "@/types/post.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RenderVehicleLabel = ({ post, makeId, modelId, year }: { post: PostVehicle, makeId: number, modelId: number, year: number }) => {
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
    const router = useRouter();

    useEffect(() => {
        if (!vehicleMakes.length || !Object.values(vehicleModels).length) {
            getVehicles().then(async (res) => {
                const { makesData, modelsData } = res;

                if (makesData.status === 200 && modelsData.status === 200) {
                    setMakes(makesData.data);
                    setModels(modelsData.data);
                }
            });
        }
    }, []);

    const RedirectToPost = () => {
        const make = encodeURI(vehicleMakes.find(make => make.id === makeId)?.make!);
        const model = encodeURI(Object.values(vehicleModels[makeId]).find(model => model.id === modelId)?.model!);
        const newUrl = encodeURI(`posts/${post.id}/${make}-${model}-${year}/${post.periods.time_created}`);

        router.push(newUrl);
    }


    return (
        vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 &&
        <span className={`text-base full_hd:text-base_2xl text-highlight hover:cursor-pointer`} onClick={RedirectToPost}>{vehicleMakes.find(item => item.id === makeId)?.make} {Object.values(vehicleModels[makeId]).find((item => item.id === modelId))?.model}</span>
    );
}