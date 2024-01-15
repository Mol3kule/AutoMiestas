import prisma from '@/prisma/prisma';
import { TVehicleModel } from '@/types/vehicle.type';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result = await prisma.make_models.findMany();

        if (result) {
            const modelsByMakeId: { [key: string]: Array<TVehicleModel> } = {};
            result.forEach((modelData) => {
                const makeId = modelData.make_id;

                if (!modelsByMakeId[makeId]) {
                    modelsByMakeId[makeId] = [];
                }

                if (!modelsByMakeId[makeId].find((model) => model.model === modelData.model)) {
                    modelsByMakeId[makeId].push({ id: modelData.id, make_id: modelData.make_id, model: modelData.model, year: JSON.parse(modelData.year as any), engine_l: modelData.engine_l!, cylinders: modelData.cylinders! });
                }
            });

            return NextResponse.json({ status: 200, data: modelsByMakeId });
        }

        return NextResponse.json({ status: 404, message: 'No data was found' });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`);
        return NextResponse.json({ status: 500 });
    }
}