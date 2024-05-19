import { Categories as PostCategories } from "@/classes/PostCategories";
import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, SteeringWheel_Side, Transmissions } from "@/classes/Vehicle";
import { Post, PostImage } from "@/types/post.type";
import { MileageType, PowerType } from "@/types/vehicle.type";
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

    ccm: number;
    power: number;
    power_type: PowerType;
    mileage_type: MileageType;

    // Additional
    technical_inspection_due: string;
    price: number;
    vin: string;
    sdk: string;
    description: string;

    primaryImg: number;
    fileImages: File[];
    filledImages: PostImage[];
    countryId: number;
    cityId: number;

    specifications: { [key in Rating]: number };

    // Item
    title: string;
    partNumber: string;

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

    // Item
    setTitle: (title: string) => void;
    setPartNumber: (partNumber: string) => void;

    setCCM: (ccm: number) => void;
    setPower: (power: number) => void;
    setPowerType: (power_type: PowerType) => void;
    setMileageType: (mileage_type: MileageType) => void;
    checkFields: () => { status: boolean, message?: string };
    checkFieldsItem: () => { status: boolean, message?: string };
    resetFields: () => void;
    fillFieldsByPostData: (postData: Post) => void;
}

export const usePostCreateStore = create<Store>()((set, get) => ({
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

    ccm: null!,
    power: null!,
    power_type: 'kw',
    mileage_type: 'km',

    // Additional
    technical_inspection_due: null!,
    vin: null!,
    sdk: null!,
    description: null!,

    primaryImg: null!,
    fileImages: [],
    filledImages: [],
    countryId: 0,
    cityId: null!,
    specifications: {
        [Rating.Equipment]: 5,
        [Rating.Body]: 5,
    },

    // Item
    title: null!,
    partNumber: null!,

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

    setCCM: (ccm: number) => set({ ccm }),
    setPower: (power: number) => set({ power }),
    setPowerType: (power_type: PowerType) => set({ power_type }),
    setMileageType: (mileage_type: MileageType) => set({ mileage_type }),

    // Additional
    setTechnicalInspectionDue: (technical_inspection_due: string) => set({ technical_inspection_due }),
    setVin: (vin: string) => set({ vin }),
    setSDK: (sdk: any) => set({ sdk }),
    setDescription: (description: string) => set({ description }),
    setSpecifications: (specifications: { [key in Rating]: number }) => set({ specifications }),

    // Item
    setTitle: (title: string) => set({ title }),
    setPartNumber: (partNumber: string) => set({ partNumber }),

    checkFields: () => {
        const { category, makeId, modelId, modelYear, bodyType, mileage, ccm, power, fuelType, drivetrain, transmission, sw_side, condition, price, fileImages, cityId, countryId } = get();
        if (category === null) return { status: false, message: "category_not_selected" };
        if (makeId === null) return { status: false, message: "make_not_selected" };
        if (modelId === null) return { status: false, message: "model_not_selected" };
        if (modelYear === null) return { status: false, message: "year_not_selected" };
        if (bodyType === null) return { status: false, message: "body_type_not_selected" };
        if (mileage === null) return { status: false, message: "mileage_not_selected" };
        if (ccm === null) return { status: false, message: "ccm_not_selected" };
        if (power === null) return { status: false, message: "power_not_selected" };
        if (fuelType === null) return { status: false, message: "fuel_type_not_selected" };
        if (drivetrain === null) return { status: false, message: "drivetrain_not_selected" };
        if (transmission === null) return { status: false, message: "transmission_not_selected" };
        if (sw_side === null) return { status: false, message: "sw_side_not_selected" };
        if (condition === null) return { status: false, message: "condition_not_selected" };
        if (price === null) return { status: false, message: "price_not_selected" };
        if (fileImages.length < 4) return { status: false, message: "images_not_selected" };

        if (countryId === null) return { status: false, message: "country_not_selected" };
        if (cityId === null) return { status: false, message: "city_not_selected" };

        return { status: true };
    },

    checkFieldsItem: () => {
        const { category, title, partNumber, condition, price, fileImages, countryId, cityId } = get();
        if (category === null) return { status: false, message: "category_not_selected" };
        if (title === null) return { status: false, message: "title_not_selected" };
        if (partNumber === null && category !== 8) return { status: false, message: "part_number_not_selected" }; // Scooter is excluded
        if (condition === null) return { status: false, message: "condition_not_selected" };
        if (price === null) return { status: false, message: "price_not_selected" };
        if (fileImages.length < 4) return { status: false, message: "images_not_selected" };

        if (countryId === null) return { status: false, message: "country_not_selected" };
        if (cityId === null) return { status: false, message: "city_not_selected" };

        return { status: true };
    },

    resetFields: () => set({
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

        ccm: null!,
        power: null!,
        power_type: 'kw',
        mileage_type: 'km',

        // Additional
        technical_inspection_due: null!,
        vin: null!,
        sdk: null!,
        description: null!,

        // Item
        title: null!,
        partNumber: null!,

        primaryImg: null!,
        fileImages: [],
        filledImages: [],
        countryId: 0,
        cityId: null!,
        specifications: {
            [Rating.Equipment]: 5,
            [Rating.Body]: 5,
        },
    }),

    fillFieldsByPostData: (postData: Post) => {
        if ('vehicleData' in postData.information) {
            const { information: { vehicleData } } = postData;
            set({
                makeId: vehicleData.make,
                modelId: vehicleData.model,
                modelYear: vehicleData.year,
                bodyType: vehicleData.body_type,
                mileage: vehicleData.mileage,
                mileage_type: vehicleData.mileage_type,
                fuelType: vehicleData.fuel_type,
                drivetrain: vehicleData.drive_train,
                transmission: vehicleData.transmission,
                sw_side: vehicleData.sw_side,
                condition: vehicleData.condition,
                ccm: vehicleData.ccm,
                power: vehicleData.power,
                power_type: vehicleData.power_type,
                technical_inspection_due: vehicleData.technical_inspection_due_to ?? '',
                vin: vehicleData.vin ?? '',
                sdk: vehicleData.sdk ?? '',
                specifications: vehicleData.ratingByAuthor,
            });
        } else {
            const { information: { itemData } } = postData;
            set({
                title: postData.information.title,
                partNumber: itemData.partNumber,
                condition: itemData.condition,
            });
        }

        set({
            price: postData.information.price,
            countryId: postData.information.location.countryId,
            cityId: postData.information.location.cityId,
            description: postData.information.description,
            filledImages: postData.images,
        });
    }
}));