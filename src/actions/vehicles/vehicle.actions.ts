"use server";

import prisma from "@/prisma/prisma";
import { TVehicleModel } from "@/types/vehicle.type";
import { Prisma } from "@prisma/client";

export const getVehicleMakes = async () => {
    return await prisma.makes.findMany();
};

export const getVehicleModels = async () => {
    const result = await prisma.make_models.findMany();

    const modelsByMakeId: { [key: string]: Array<TVehicleModel> } = {};
    await Promise.all(result?.map((modelData) => {
        const makeId = modelData.make_id;

        if (!modelsByMakeId[makeId]) {
            modelsByMakeId[makeId] = [];
        }

        if (!modelsByMakeId[makeId].find((model) => model.model === modelData.model)) {
            modelsByMakeId[makeId].push({ id: modelData.id, make_id: modelData.make_id, model: modelData.model, type: modelData.type as Prisma.JsonArray });
        }
    }));

    return modelsByMakeId;
};

export const getSelectedVehicle = async (makeId: number, modelId: number) => {
    if (typeof makeId !== "number" || typeof modelId !== "number") {
        return { status: 400, message: "Invalid input" };
    }

    const vehicleMakes = await getVehicleMakes();
    const vehicleModels = await getVehicleModels();

    const selectedMake = vehicleMakes.find((make) => make.id === makeId);
    const selectedModel = vehicleModels[makeId].find((model) => model.id === modelId);

    return { make: selectedMake, model: selectedModel };
}