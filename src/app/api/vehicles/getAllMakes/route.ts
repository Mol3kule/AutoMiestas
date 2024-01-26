import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result = await prisma.makes.findMany();

        if (result) {
            return NextResponse.json({ status: 200, data: result });
        }

        return NextResponse.json({ status: 404, message: 'No data was found' });
    } catch (error) {
        console.log(`[getAllMakes]: ${error}`)
        return NextResponse.json({ status: 500 });
    }
}