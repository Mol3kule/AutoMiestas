import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

type PostData = {
    postId: number;
}

export const POST = async (request: Request) => {
    try {
        const { postId }: PostData = await request.json();

        const post = await prisma.posts.findFirst({
            where: {
                id: postId
            }
        })

        if (!post) {
            return NextResponse.json({ status: 404, message: 'Post wasnt found', translation: 'request_error' });
        }
        
        return NextResponse.json({ status: 200, data: post });
    } catch (error) {
        console.log(`[posts/getPostById]: ${error}`);
        return NextResponse.json({ status: 500, translation: 'internal_server_error' });
    }
}