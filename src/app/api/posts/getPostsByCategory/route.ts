import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const { category } = await request.json();

        if (category === null || category === undefined) {
            return NextResponse.json({ status: 400, message: 'Category is required' });
        }

        const posts = await prisma.posts.findMany({
            where: {
                status: {
                    path: '$.isPublished',
                    equals: true
                },
                category: category
            }
        });

        if (!posts) {
            return NextResponse.json({ status: 404, message: 'Posts not found' });
        }

        return NextResponse.json({ status: 200, data: posts });
    } catch (error) {
        console.log(`[getPostsbyCategory]: ${error}`)
        return NextResponse.json({ status: 500, message: 'Couldnt get posts' })
    }
}