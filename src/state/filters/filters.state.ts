import { create } from 'zustand';

interface IFilter {
    makeId: number | null;
    model: string | null;

    setMake: (make: number) => void;
    setModel: (model: string) => void;
}

export const useFilterStore = create<IFilter>()((set) => ({
    makeId: null,
    model: null,

    setMake: (makeId) => set({ makeId }),
    setModel: (model) => set({ model })
}));