"use client";

import { TVehicle, useFilterStore } from "@/state/filters/filters.state";
import { Bike, Bus, Car, Tractor, Truck } from "lucide-react";

interface IVehicleTypeList {
    type: TVehicle,
    icon: JSX.Element
}

const VehicleTypeList: IVehicleTypeList[] = [
    { type: "Automobile", icon: <Car size={30} /> },
    { type: "Bike", icon: <Bike size={30} /> },
    { type: "Bus", icon: <Bus size={30} /> },
    { type: "Truck", icon: <Truck size={30} /> },
    { type: "Tractor", icon: <Tractor size={30} /> },
    // { type: "Trailer", icon: <Caravan size={30}/> },
];

const RenderType = ({ data }: { data: IVehicleTypeList }) => {
    const { vehicleType, setVehicleType } = useFilterStore();

    const UpdateSelectedType = (newType: TVehicle) => {
        if (vehicleType === newType) return;
        setVehicleType(newType);
    }

    return (
        <button className={`h-[42px] bg-[#F7F7F8] flex flex-1 justify-center items-center`} onClick={() => UpdateSelectedType(data.type)}>
            <span className={`${vehicleType === data.type ? `text-[#111111] animate-pulse` : `opacity-[0.1]` }`}>
                {data.icon}
            </span>
        </button>
    );
}

export const VehicleTypeSelector = () => {
    return (
        <div className={`flex md:px-[490px] md:gap-[20px]`}>
            {VehicleTypeList?.map((item, idx) => (
                <RenderType key={`${item.type}_${idx}_list`} data={item} />
            ))}
        </div>
    );
}