import prisma from '@/prisma/prisma';
import { TVehicleModel, TVehicleYears } from '@/types/vehicle.type';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result: TVehicleModel[] = await prisma.make_models.findMany();

        if (result) {
            const newList: TVehicleYears = {};
            result.forEach((modelData) => {
                const { id, make_id, label, year } = modelData;
                const lowerCaseLabel = label.toLowerCase();

                if (!newList[make_id]) {
                    newList[make_id] = {};
                }

                if (!newList[make_id][lowerCaseLabel]) {
                    newList[make_id][lowerCaseLabel] = [];
                }

                if (!newList[make_id][lowerCaseLabel].find((model) => model.year === year)) {
                    newList[make_id][lowerCaseLabel].push({ id, make_id, year });
                }
            });

            return NextResponse.json({ status: 'success', data: newList });
        }

        return NextResponse.json({ status: 'error', message: 'No data was found' });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`);
        return NextResponse.json({ status: 'error' });
    }
}