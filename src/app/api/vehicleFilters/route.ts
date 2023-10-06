import prisma from '@/prisma/prisma';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const { type, id } = await request.json();
    switch (type) {
        case 'getModelsByMakeId': {
            const requestData = await prisma.make_models.findMany({
                where: {
                    make_id: id
                }
            });

            return NextResponse.json({ models: requestData });
        }
        default: break;
    }
}