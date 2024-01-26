import { Categories } from "@/classes/PostCategories";
import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, SteeringWheel_Side, Transmissions } from "@/classes/Vehicle";
import { MileageType, PowerType } from "./vehicle.type";

export type Post = {
    id?: number;
    authorId: string;
    images: PostImage[];
    statistics: PostStatistics;
    ratingByAuthor: PostRating;
    periods: PostPeriods;
    boosts: PostBoosts;
    subscriptionId: string | null;
    status: PostStatus;
    isSubscriptionActive: boolean;
    category: Categories;
}

export type PostVehicle = Post & {
    information: PostInformation;
}

export type PostStatus = {
    isPublished: boolean;
    isAttentionRequired: boolean;
    isEditedAfterAttentionRequired: boolean;
}

export type PostInformation = {
    description: string;
    location: {
        city: string;
        country: string;
    };
    vehicleData: PostVehicleDataInformation;
    price: number;
}

export type PostVehicleDataInformation = {
    make: number;
    model: number;
    year: number;
    body_type: BodyType;
    sw_side: SteeringWheel_Side;
    condition: Conditions;
    fuel_type: FuelTypes;
    drive_train: Drivetrains;
    transmission: Transmissions;
    mileage: number;
    mileage_type: MileageType;
    technical_inspection_due_to: string | null;
    vin: string | null;
    sdk: string | null;

    ccm: number;
    power: number;
    power_type: PowerType;
}

export type PostImage = {
    key: string;
    url: string;
    isPrimary: boolean;
}

export type PostStatistics = {
    times_viewed: Array<string>;
    times_liked: Array<string>;
}

export type PostRating = {
    [key in Rating]: number;
}

export type PostPeriods = {
    time_created: number;
    time_updated: number;
}

export type PostBoosts = {
    time_created: number | null;
}