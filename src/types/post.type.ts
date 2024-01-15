import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, SteeringWheel_Side, Tags, Transmissions, Types } from "@/classes/Vehicle";

export type Post = {
    id?: number;
    authorId: string;
    information: PostInformation;
    images: PostImage[];
    statistics: PostStatistics;
    tags: PostTags;
    ratingByAuthor: PostRating;
    periods: PostPeriods;
    boosts: PostBoosts;
    subscriptionId: string;
    isActive: boolean;
    isVerified: boolean;
    category: Types;
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
    technical_inspection_due_to: string | null;
    vin: string | null;
    sdk: string | null;
}

export type PostImage = {
    key: string;
    url: string;
    isPrimary: boolean;
}

export type PostStatistics = {
    times_viewed: Array<number>;
    times_displayed: number;
    times_liked: Array<number>;
}

// Array of enum indexes
export type PostTags = Tags[];

export type PostRating = {
    [key in Rating]: number;
}

export type PostPeriods = {
    time_created: number;
    time_updated: number;
    time_due: number;
}

export type PostBoosts = {
    time_created: number | null;
    time_due: number | null;
}