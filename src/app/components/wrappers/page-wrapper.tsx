'use client';

import { getVehicles } from "@/actions/vehicles/vehicle.actions";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { useQuery } from "@tanstack/react-query";
import ReactModal from "react-modal";
import { Spinner } from "../spinner";

ReactModal.setAppElement('body');

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    const { vehicleMakes, vehicleModels, setMakes, setModels } = useVehicleStore();

    const { isLoading } = useQuery({
        queryKey: ["getVehicles", { vehicleMakes, vehicleModels }],
        queryFn: async () => {
            const { makes, models } = await getVehicles();
            setMakes(makes);
            setModels(models);
            return { makes, models };
        },
    });

    return (
        <div className={`flex flex-col gap-[20px] flex-1`}>
            <div className={`h-full px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[2.20rem] flex flex-col flex-1 ${isLoading ? `items-center justify-center` : `gap-[20px]`}`}>
                {!isLoading ? (
                    <>{children}</>
                ) : (
                    <Spinner />
                )}
            </div>
        </div>
    );
}