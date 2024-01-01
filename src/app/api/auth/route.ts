import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const { type, data } = await request.json();
    switch (type) {
        case 'createNew': {
            await prisma.users.create({
                data: {
                    userId: data.userId
                }
            });

            return NextResponse.json({ status: 'success' });
        }
        default: break;
    }
}