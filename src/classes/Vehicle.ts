export enum Types { Car, Truck, Motorcycle, Boat, RV, Other }
export enum BodyType { Sedan, SUV, Truck, Van, Coupe, Convertible, Hatchback, Wagon, Crossover, Minivan, Other }
export enum Conditions { New, Used }
export enum Drivetrains { FWD, RWD, AWD }
export enum FuelTypes { Gasoline, Diesel, Electric, Hybrid, Other }
export enum Transmissions { Automatic, Manual }
export enum Tags { HeatedSeats, HeatedSteeringWheel, LeatherSeats }
export enum Rating { Equipment, Body }

export class Vehicle {
    private RequiredFields = ['make', 'model', 'year', 'category', 'condition', 'fuel_type', 'drive_train', 'transmission', 'mileage', "sw_side", "price"];

    private Types: { [key in Types]: string } = {
        [Types.Car]: 'car',
        [Types.Truck]: 'truck',
        [Types.Motorcycle]: 'motorcycle',
        [Types.Boat]: 'boat',
        [Types.RV]: 'rv',
        [Types.Other]: 'other'
    };

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

    public getTypeByIndex(index: Types): string {
        return this.Types[index];
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
    }

    public getAllBodyTypes(): { [key in BodyType]: string } {
        return this.BodyTypes;
    }

    public getLabelByKeyAndIndex(translation: any, key: string, index: any): string {
        switch (key) {
            case "type": {
                return translation.vehicleInfo.objKeys[VehicleObj.getTypeByIndex(index)];
            }
            case "category": {
                return translation.vehicleInfo.categories[VehicleObj.getBodyTypeByIndex(index)];
            }
            case "condition": {
                return translation.vehicleInfo.conditions[VehicleObj.getConditionByIndex(index)];
            }
            case "fuel_type": {
                return translation.vehicleInfo.fuelTypes[VehicleObj.getFuelTypeByIndex(index)];
            }
            case "drive_train": {
                return translation.vehicleInfo.drivetrains[VehicleObj.getDrivetrainByIndex(index)];
            }
            case "transmission": {
                return translation.vehicleInfo.transmission[VehicleObj.getTransmissionByIndex(index)];
            }
            default: {
                return index;
            }
        }
    };
};

export const VehicleObj = new Vehicle();