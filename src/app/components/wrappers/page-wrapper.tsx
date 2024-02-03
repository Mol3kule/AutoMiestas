'use client';
import { getVehicles } from "@/lib/getVehicles";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { useEffect } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement('body');

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
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
        <div className={`flex flex-col gap-[20px] flex-1`}>
            <div className={`h-full px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[2.20rem] flex flex-col gap-[20px] flex-1`}>
                {children}
            </div>
        </div>
    );
}