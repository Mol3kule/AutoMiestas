import { Categories as PostCategories } from "@/classes/PostCategories";
import { BodyType, FuelTypes } from "@/classes/Vehicle";
import { create } from "zustand";

type Store = {
    category: PostCategories;
    makeId: number;
    modelId: number;
    modelYear: number;
    bodyType: BodyType;
    mileage: number;
    fuelType: FuelTypes;

    setCategory: (category: PostCategories) => void;
    setMakeId: (makeId: number) => void;
    setModelId: (modelId: number) => void;
    setModelYear: (modelYear: number) => void;
    setBodyType: (bodyType: BodyType) => void;
    setMileage: (mileage: number) => void;
    setFuelType: (fuelType: FuelTypes) => void;
}

export const usePostCreateStore = create<Store>()((set) => ({
    category: PostCategories.vehicle,
    makeId: null!,
    modelId: null!,
    modelYear: null!,
    bodyType: null!,
    mileage: null!,
    fuelType: null!,

    setCategory: (category: PostCategories) => set({ category }),
    setMakeId: (makeId: number) => set({ makeId }),
    setModelId: (modelId: number) => set({ modelId }),
    setModelYear: (modelYear: number) => set({ modelYear }),
    setBodyType: (bodyType: BodyType) => set({ bodyType }),
    setMileage: (mileage: number) => set({ mileage }),
    setFuelType: (fuelType: FuelTypes) => set({ fuelType }),
}));