import { TVehicleMake, TVehicleModels, TVehicleYears } from "@/types/vehicle.type";
import { create } from "zustand";

type Store = {
    vehicleMakes: TVehicleMake[];
    setMakes: (vehicleMakes: TVehicleMake[]) => void; // Array of vehicle makes

    vehicleModels: TVehicleModels[];
    setModels: (vehicleModels: TVehicleModels[]) => void; // Array of vehicle models

    vehicleYears: TVehicleYears;
    setYears: (vehicleYears: TVehicleYears) => void; // Array of vehicle years
}

export const useVehicleStore = create<Store>()((set) => ({
    vehicleMakes: [],
    setMakes: (vehicleMakes: TVehicleMake[]) => set({ vehicleMakes }),

    vehicleModels: [],
    setModels: (vehicleModels: TVehicleModels[]) => set({ vehicleModels }),

    vehicleYears: {},
    setYears: (vehicleYears: TVehicleYears) => set({ vehicleYears }),
}));