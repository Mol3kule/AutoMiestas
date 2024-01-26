import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const { postId, timestamp } = await request.json();

        if (typeof postId !== 'number' || !timestamp) {
            return NextResponse.json({ status: 400, message: 'Bad request' });
        }

        const post = await prisma.posts.findFirst({
            where: {
                id: postId,
                periods: {
                    path: '$.time_created',
                    equals: Number(timestamp)
                }
            }
        });

        if (!post) {
            return NextResponse.json({ status: 404, message: 'Skelbimas nerastas arba puslapis nepasiekiamas' });
        }

        return NextResponse.json({ status: 200, data: post });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`)
        return NextResponse.json({ status: 500 });
    }
}