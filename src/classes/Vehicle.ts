import { MileageType, PowerType, TVehicleMake, TVehicleModel, TVehicleModels } from "@/types/vehicle.type";
import { Categories } from "./PostCategories";

export enum BodyType { Sedan, SUV, Truck, Van, Coupe, Convertible, Hatchback, Wagon, Crossover, Minivan, Other }
export enum Conditions { New, Used }
export enum Drivetrains { FWD, RWD, AWD }
export enum FuelTypes { Gasoline, Diesel, Electric, Hybrid, Other }
export enum Transmissions { Automatic, Manual }
export enum Tags { HeatedSeats, HeatedSteeringWheel, LeatherSeats }
export enum Rating { Equipment, Body }
export enum SteeringWheel_Side { Left, Right }

export type getVehicleDataProps = {
    make: TVehicleMake | undefined;
    model: TVehicleModel | undefined;
    body_type: string;
    condition: string;
    fuel_type: string;
    drive_train: string;
    transmission: string;
    sw_side: string;
}

export class Vehicle {
    private Types: { [key: number]: number } = {
        [0]: Categories.vehicle,
        [1]: Categories.motorcycle,
        [2]: Categories.heavy,
        [3]: Categories.agricultural,
        [4]: Categories.construction,
        [5]: Categories.trailer,
        [6]: Categories.boat,
        [7]: Categories.plane,
        [8]: Categories.scooter
    }

    private BodyTypes: { [key in BodyType]: string } = {
        [BodyType.Sedan]: 'sedan',
        [BodyType.SUV]: 'suv',
        [BodyType.Truck]: 'truck',
        [BodyType.Van]: 'van',
        [BodyType.Coupe]: 'coupe',
        [BodyType.Convertible]: 'convertible',
        [BodyType.Hatchback]: 'hatchback',
        [BodyType.Wagon]: 'wagon',
        [BodyType.Crossover]: 'crossover',
        [BodyType.Minivan]: 'minivan',
        [BodyType.Other]: 'other'
    };

    private Conditions: { [key in Conditions]: string } = {
        [Conditions.New]: 'new',
        [Conditions.Used]: 'used'
    };

    private FuelTypes: { [key in FuelTypes]: string } = {
        [FuelTypes.Diesel]: 'diesel',
        [FuelTypes.Electric]: 'electric',
        [FuelTypes.Gasoline]: 'gasoline',
        [FuelTypes.Hybrid]: 'hybrid',
        [FuelTypes.Other]: 'other'
    };

    private Drivetrains: { [key in Drivetrains]: string } = {
        [Drivetrains.FWD]: 'fwd',
        [Drivetrains.RWD]: 'rwd',
        [Drivetrains.AWD]: 'awd'
    };

    private Transmissions: { [key in Transmissions]: string } = {
        [Transmissions.Automatic]: 'automatic',
        [Transmissions.Manual]: 'manual'
    };

    private Tags: { [key in Tags]: string } = {
        [Tags.HeatedSeats]: 'heated_seats',
        [Tags.HeatedSteeringWheel]: 'heated_steering_wheel',
        [Tags.LeatherSeats]: 'leather_seats'
    };

    private Rating: { [key in Rating]: string } = {
        [Rating.Equipment]: 'equipment',
        [Rating.Body]: 'body'
    };

    private SteeringWheel_Side: { [key in SteeringWheel_Side]: string } = {
        [SteeringWheel_Side.Left]: 'left',
        [SteeringWheel_Side.Right]: 'right'
    };

    private MileageTypes: { [key: number]: MileageType } = {
        [0]: 'km',
        [1]: 'mi'
    };

    private PowerTypes: { [key: number]: PowerType } = {
        [0]: 'hp',
        [1]: 'kw'
    };

    public getBodyTypeByIndex(index: BodyType): string {
        return this.BodyTypes[index];
    };

    public getConditionByIndex(index: Conditions): string {
        return this.Conditions[index];
    };

    public getFuelTypeByIndex(index: FuelTypes): string {
        return this.FuelTypes[index];
    };

    public getDrivetrainByIndex(index: Drivetrains): string {
        return this.Drivetrains[index];
    };

    public getTransmissionByIndex(index: Transmissions): string {
        return this.Transmissions[index];
    };

    public getTagByIndex(index: Tags): string {
        return this.Tags[index];
    };

    public getRatingByIndex(index: Rating): string {
        return this.Rating[index];
    };

    public getSteeringWheelSideByIndex(index: SteeringWheel_Side): string {
        return this.SteeringWheel_Side[index];
    };

    public getMileageTypeByIndex(index: number): MileageType {
        return this.MileageTypes[index];
    };

    public getPowerTypeByIndex(index: number): PowerType {
        return this.PowerTypes[index];
    };

    public getAllTypes(): { [key: number]: number } {
        return this.Types;
    };

    public getAllBodyTypes(): { [key in BodyType]: string } {
        return this.BodyTypes;
    };

    public getAllConditions(): { [key in Conditions]: string } {
        return this.Conditions;
    };

    public getAllFuelTypes(): { [key in FuelTypes]: string } {
        return this.FuelTypes;
    };

    public getAllDrivetrains(): { [key in Drivetrains]: string } {
        return this.Drivetrains;
    };

    public getAllTransmissions(): { [key in Transmissions]: string } {
        return this.Transmissions;
    };

    public getAllSteeringWheelSides(): { [key in SteeringWheel_Side]: string } {
        return this.SteeringWheel_Side;
    };

    public getAllRatings(): { [key in Rating]: string } {
        return this.Rating;
    }

    public getAllMileageTypes(): { [key: number]: MileageType } {
        return this.MileageTypes;
    };

    public getAllPowerTypes(): { [key: number]: string } {
        return this.PowerTypes;
    };

    public getLabelByKeyAndIndex(translation: any, key: string, index: any): string {
        switch (key) {
            case "body_type": {
                return translation.vehicleInfo.body_type[this.getBodyTypeByIndex(index)];
            }
            case "condition": {
                return translation.vehicleInfo.conditions[this.getConditionByIndex(index)];
            }
            case "fuel_type": {
                return translation.vehicleInfo.fuelTypes[this.getFuelTypeByIndex(index)];
            }
            case "drive_train": {
                return translation.vehicleInfo.drivetrains[this.getDrivetrainByIndex(index)];
            }
            case "transmission": {
                return translation.vehicleInfo.transmission[this.getTransmissionByIndex(index)];
            }
            case "sw_side": {
                return translation.vehicleInfo.sw_side[this.getSteeringWheelSideByIndex(index)];
            }
            case "ccm": {
                return translation.vehicleInfo.ccm
            }
            case "power": {
                return translation.vehicleInfo.power
            }
            default: {
                return index;
            }
        }
    };

    // Getters
    public getVehicleDataByIdx(vehicleMakes: TVehicleMake[], vehicleModels: TVehicleModels[], makeId: number, modelId: number, bodyTypeId: number, conditionId: number, fuelTypeId: number, driveTrainId: number, transmissionId: number, steeringWheelSideId: number) {
        return {
            make: this.getVehicleMakeDataByIdx(vehicleMakes, makeId),
            model: this.getVehicleModelDataByIdx(vehicleModels, makeId, modelId),
            body_type: this.getBodyTypeByIndex(bodyTypeId),
            condition: this.getConditionByIndex(conditionId),
            fuel_type: this.getFuelTypeByIndex(fuelTypeId),
            drive_train: this.getDrivetrainByIndex(driveTrainId),
            transmission: this.getTransmissionByIndex(transmissionId),
            sw_side: this.getSteeringWheelSideByIndex(steeringWheelSideId)
        }
    };

    public getVehicleMakeDataByIdx(vehicleMakes: TVehicleMake[], makeId: number) {
        return vehicleMakes.find((make) => make.id === makeId);
    };

    public getVehicleModelDataByIdx(vehicleModels: TVehicleModels[], makeId: number, modelId: number) {
        return Object.values(vehicleModels[makeId]).find(model => model.id === modelId);
    };


};

export const VehicleObj = new Vehicle();