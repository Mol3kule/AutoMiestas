import { create } from 'zustand';

export type TVehicle = 'Automobile' | 'Bike' | 'Truck' | 'Tractor' | 'Boat' | 'Bus' | 'Trailer';
type TCar = 'Sedan' | 'Suv' | 'Pickup' | 'Coupe' | 'SUV' | 'Convertible' | 'Hatchback' | 'Van/Minivan';

interface IFilter {
    vehicleType: TVehicle;
    makeId: number | null;
    model: string | null;
    price: { min: number, max: number },

    setMake: (make: number) => void;
    setModel: (model: string) => void;
    setPrice: (price: { min: number, max: number }) => void;
}

export const useFilterStore = create<IFilter>()((set) => ({
    vehicleType: 'Automobile',
    makeId: null,
    model: null,
    price: {
        min: 100,
        max: 10000
    },

    setVehicleType: (vehicleType: TVehicle) => set({ vehicleType }),
    setMake: (makeId) => set({ makeId }),
    setModel: (model) => set({ model }),
    setPrice: (price) => set({ price }),
}));