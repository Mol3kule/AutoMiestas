import { Categories as PostCategories } from "@/classes/PostCategories";
import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, SteeringWheel_Side, Transmissions } from "@/classes/Vehicle";
import { create } from "zustand";

type Store = {
    category: PostCategories;
    makeId: number;
    modelId: number;
    modelYear: number;
    bodyType: BodyType;
    mileage: number;
    fuelType: FuelTypes;
    drivetrain: Drivetrains;
    transmission: Transmissions;
    sw_side: SteeringWheel_Side;
    condition: Conditions;

    // Additional
    technical_inspection_due: string;
    price: number;
    vin: string;
    sdk: string;
    description: string;

    primaryImg: number;
    fileImages: File[];
    countryId: number;
    cityId: number;

    specifications: { [key in Rating]: number };

    setCategory: (category: PostCategories) => void;
    setMakeId: (makeId: number) => void;
    setModelId: (modelId: number) => void;
    setModelYear: (modelYear: number) => void;
    setBodyType: (bodyType: BodyType) => void;
    setMileage: (mileage: number) => void;
    setFuelType: (fuelType: FuelTypes) => void;
    setDrivetrain: (drivetrain: Drivetrains) => void;
    setTransmission: (transmission: Transmissions) => void;
    setSteeringWheelSide: (sw_side: SteeringWheel_Side) => void;
    setCondition: (condition: Conditions) => void;

    // Additional
    setTechnicalInspectionDue: (technical_inspection_due: string) => void;
    setPrice: (price: number) => void;
    setVin: (vin: string) => void;
    setSDK: (sdk: any) => void;
    setDescription: (description: string) => void;

    setPrimaryImg: (primaryImg: number) => void;
    setFileImages: (fileImages: File[]) => void;
    setCountryId: (country: number) => void;
    setCityId: (city: number) => void;
    setSpecifications: (specifications: { [key in Rating]: number }) => void;
}

export const usePostCreateStore = create<Store>()((set) => ({
    category: PostCategories.vehicle,
    makeId: null!,
    modelId: null!,
    modelYear: null!,
    bodyType: null!,
    mileage: null!,
    fuelType: null!,
    drivetrain: null!,
    transmission: null!,
    sw_side: null!,
    condition: null!,
    price: null!,

    // Additional
    technical_inspection_due: null!,
    vin: null!,
    sdk: null!,
    description: null!,

    primaryImg: null!,
    fileImages: [],
    countryId: null!,
    cityId: null!,
    specifications: {
        [Rating.Equipment]: 5,
        [Rating.Body]: 5,
    },

    setCategory: (category: PostCategories) => set({ category }),
    setMakeId: (makeId: number) => set({ makeId }),
    setModelId: (modelId: number) => set({ modelId }),
    setModelYear: (modelYear: number) => set({ modelYear }),
    setBodyType: (bodyType: BodyType) => set({ bodyType }),
    setMileage: (mileage: number) => set({ mileage }),
    setFuelType: (fuelType: FuelTypes) => set({ fuelType }),
    setDrivetrain: (drivetrain: Drivetrains) => set({ drivetrain }),
    setTransmission: (transmission: Transmissions) => set({ transmission }),
    setSteeringWheelSide: (sw_side: SteeringWheel_Side) => set({ sw_side }),
    setCondition: (condition: Conditions) => set({ condition }),
    setPrice: (price: number) => set({ price }),

    setPrimaryImg: (primaryImg: number) => set({ primaryImg }),
    setFileImages: (fileImages: File[]) => set({ fileImages }),
    setCountryId: (countryId: number) => set({ countryId }),
    setCityId: (cityId: number) => set({ cityId }),

    // Additional
    setTechnicalInspectionDue: (technical_inspection_due: string) => set({ technical_inspection_due }),
    setVin: (vin: string) => set({ vin }),
    setSDK: (sdk: any) => set({ sdk }),
    setDescription: (description: string) => set({ description }),
    setSpecifications: (specifications: { [key in Rating]: number }) => set({ specifications }),
}));