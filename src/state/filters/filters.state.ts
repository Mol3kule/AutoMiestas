import prisma from '@/prisma/prisma';
import { create } from 'zustand';

export type TVehicle = 'Automobile' | 'Bike' | 'Truck' | 'Tractor' | 'Boat' | 'Bus' | 'Trailer';
type TCar = 'Sedan' | 'Suv' | 'Pickup' | 'Coupe' | 'SUV' | 'Convertible' | 'Hatchback' | 'Van/Minivan';

interface IFilter {
    vehicleType: TVehicle;
    makeId: number | null;
    model: string | null;
    price: { min: number, max: number },

    yearFrom: number | null;
    yearTo: number | null;

    setMake: (make: number) => void;
    setModel: (model: string) => void;
    setPrice: (price: { min: number, max: number }) => void;
    setVehicleType: (vehicleType: TVehicle) => void;

    getVehicleYears: () => Promise<Array<Number>>;
    setYearFrom: (yearFrom: number) => void;
}

export const useFilterStore = create<IFilter>()((set) => ({
    vehicleType: 'Automobile',
    makeId: null,
    model: null,
    price: {
        min: 100,
        max: 10000
    },

    yearFrom: null,
    yearTo: null,

    setVehicleType: (vehicleType: TVehicle) => set({ vehicleType }),
    setMake: (makeId) => set({ makeId }),
    setModel: (model) => set({ model }),
    setPrice: (price) => set({ price }),

    getVehicleYears: async () => {
        const vehicleYears = new Set<Number>([]);
        const vehicleModels = await prisma.make_models.findMany({ orderBy: { year: 'desc' } }); // move to api

        vehicleModels.forEach((model) => {
            vehicleYears.add(model.year);
        });

        return Array.from(vehicleYears);
    },

    setYearFrom: (yearFrom: number) => set({ yearFrom })
}));