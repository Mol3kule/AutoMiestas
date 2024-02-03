import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, SteeringWheel_Side, Transmissions } from "@/classes/Vehicle";
import { PostInformation, PostType } from "../post.type";
import { MileageType, PowerType } from "../vehicle.type";

export type PostVehicle = PostType & {
    information: VehiclePostInformation;
}

export type VehiclePostInformation = PostInformation & {
    vehicleData: PostVehicleDataInformation;
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
    ratingByAuthor: RatingByAuthor;
}

export type RatingByAuthor = {
    [key in Rating]: number;
}