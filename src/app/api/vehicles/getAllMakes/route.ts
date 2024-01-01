import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const result = await prisma.makes.findMany();

        if (result) {
            return NextResponse.json({ status: 'success', data: result });
        }

        return NextResponse.json({ status: 'error', message: 'No data was found' });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`)
        return NextResponse.json({ status: 'error' });
    }
}