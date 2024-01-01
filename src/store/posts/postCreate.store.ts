import { Categories as PostCategories } from "@/classes/PostCategories";
import { BodyType } from "@/classes/Vehicle";
import { create } from "zustand";

type Store = {
    category: PostCategories;
    makeId: number;
    modelId: number;
    modelYear: number;
    bodyType: BodyType;

    setCategory: (category: PostCategories) => void;
    setMakeId: (makeId: number) => void;
    setModelId: (modelId: number) => void;
    setModelYear: (modelYear: number) => void;
    setBodyType: (bodyType: BodyType) => void;
}

export const usePostCreateStore = create<Store>()((set) => ({
    category: PostCategories.vehicle,
    makeId: null!,
    modelId: null!,
    modelYear: null!,
    bodyType: null!,

    setCategory: (category: PostCategories) => set({ category }),
    setMakeId: (makeId: number) => set({ makeId }),
    setModelId: (modelId: number) => set({ modelId }),
    setModelYear: (modelYear: number) => set({ modelYear }),
    setBodyType: (bodyType: BodyType) => set({ bodyType }),
}));