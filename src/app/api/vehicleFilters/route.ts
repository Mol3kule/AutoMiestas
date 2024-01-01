import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const { type, data } = await request.json();
    switch (type) {
        case 'getModelsByMakeId': {
            const requestData = await prisma.make_models.findMany({
                where: {
                    make_id: data?.id
                }
            });

            return NextResponse.json({ models: requestData });
        }
        case 'getYearsByModel': {
            const vehicleYears = new Set<Number>([]);
            const vehicleModels = await prisma.make_models.findMany({
                where: { make_id: data.makeId }
            });

            vehicleModels.forEach((model) => {
                vehicleYears.add(model.year);
            });

            return NextResponse.json({ modelYears: Array.from(vehicleYears) });
        }
        default: break;
    }
}