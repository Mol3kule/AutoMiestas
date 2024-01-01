import prisma from '@/prisma/prisma';
import { TVehicleModel } from '@/types/vehicle.type';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result: TVehicleModel[] = await prisma.make_models.findMany();

        if (result) {
            const modelsByMakeId: { [key: string]: Array<TVehicleModel> } = {};
            result.forEach((modelData) => {
                const makeId = modelData.make_id;

                if (!modelsByMakeId[makeId]) {
                    modelsByMakeId[makeId] = [];
                }

                if (!modelsByMakeId[makeId].find((model) => model.label === modelData.label)) {
                    modelsByMakeId[makeId].push(modelData);
                }
            });

            return NextResponse.json({ status: 'success', data: modelsByMakeId });
        }

        return NextResponse.json({ status: 'error', message: 'No data was found' });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`);
        return NextResponse.json({ status: 'error' });
    }
}