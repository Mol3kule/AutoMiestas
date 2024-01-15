"use client";

import { getVehicles } from "@/lib/getVehicles";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { useEffect } from "react";

export const RenderVehicleLabel = ({ makeId, modelId }: { makeId: number, modelId: number }) => {
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();
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
    return (
        vehicleMakes.length > 0 && Object.values(vehicleModels).length > 0 &&
        <span className={`text-base full_hd:text-base_2xl text-primary`}>{vehicleMakes.find(item => item.id === makeId)?.make} {Object.values(vehicleModels[makeId]).find((item => item.id === modelId))?.model}</span>
    );
}