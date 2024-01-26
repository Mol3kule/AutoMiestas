import prisma from '@/prisma/prisma';
import { TVehicleModel } from '@/types/vehicle.type';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result = await prisma.make_models.findMany();

        if (result) {
            const modelsByMakeId: { [key: string]: Array<TVehicleModel> } = {};
            await Promise.all(result.map((modelData) => {
                const makeId = modelData.make_id;

                if (!modelsByMakeId[makeId]) {
                    modelsByMakeId[makeId] = [];
                }

                if (!modelsByMakeId[makeId].find((model) => model.model === modelData.model)) {
                    modelsByMakeId[makeId].push({ id: modelData.id, make_id: modelData.make_id, model: modelData.model, type: modelData.type as Prisma.JsonArray });
                }
            }));

            return NextResponse.json({ status: 200, data: modelsByMakeId });
        }

        return NextResponse.json({ status: 404, message: 'No data was found' });
    } catch (error) {
        console.log(`[getAllModels]: ${error}`);
        return NextResponse.json({ status: 500 });
    }
}