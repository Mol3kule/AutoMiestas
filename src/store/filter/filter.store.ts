import { Categories as PostCategories } from "@/classes/PostCategories";
import { create } from "zustand";

type Store = {
    category: PostCategories;
    makeId: number;
    modelId: number;

    setCategory: (category: PostCategories) => void;
    setMakeId: (makeId: number) => void;
    setModelId: (modelId: number) => void;
}

export const useFilterStore = create<Store>()((set) => ({
    category: PostCategories.vehicle,
    makeId: null!,
    modelId: null!,

    setCategory: (category: PostCategories) => set({ category }),
    setMakeId: (makeId: number) => set({ makeId }),
    setModelId: (modelId: number) => set({ modelId }),
}));