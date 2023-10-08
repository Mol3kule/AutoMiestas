import { create } from 'zustand';

interface IFilter {
    makeId: number | null;
    model: string | null;
    price: {
        min: number,
        max: number
    }

    setMake: (make: number) => void;
    setModel: (model: string) => void;
    setPrice: (price: { min: number, max: number }) => void;
}

export const useFilterStore = create<IFilter>()((set) => ({
    makeId: null,
    model: null,
    price: {
        min: 100,
        max: 10000
    },

    setMake: (makeId) => set({ makeId }),
    setModel: (model) => set({ model }),
    setPrice: (price) => set({ price }),
}));