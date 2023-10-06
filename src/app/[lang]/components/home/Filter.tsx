import { TVehicleMake } from "@/types/vehicle.type";
import FilterBar from "./FilterBar";
import prisma from "@/prisma/prisma";
import axios from "axios";

export const FilterComponent = async () => {
    const VehicleMakesData: TVehicleMake[] = await prisma.makes.findMany();

    return (
        <FilterBar makesData={VehicleMakesData} />
    )
}