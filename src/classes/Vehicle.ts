export enum Types { Car, Truck, Motorcycle, Boat, RV, Other }
export enum BodyType { Sedan, SUV, Truck, Van, Coupe, Convertible, Hatchback, Wagon, Crossover, Minivan, Other }
export enum Conditions { New, Used }
export enum Drivetrains { FWD, RWD, AWD }
export enum FuelTypes { Gasoline, Diesel, Electric, Hybrid, Other }
export enum Transmissions { Automatic, Manual }
export enum Tags { HeatedSeats, HeatedSteeringWheel, LeatherSeats }
export enum Rating { Equipment, Body }
export enum SteeringWheel_Side { Left, Right }

export class Vehicle {
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

    private SteeringWheel_Side: { [key in SteeringWheel_Side]: string } = {
        [SteeringWheel_Side.Left]: 'left',
        [SteeringWheel_Side.Right]: 'right'
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
    };

    public getSteeringWheelSideByIndex(index: SteeringWheel_Side): string {
        return this.SteeringWheel_Side[index];
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

    public getLabelByKeyAndIndex(translation: any, key: string, index: any): string {
        switch (key) {
            case "type": {
                return translation.vehicleInfo.objKeys[this.getTypeByIndex(index)];
            }
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
            default: {
                return index;
            }
        }
    };
};

export const VehicleObj = new Vehicle();