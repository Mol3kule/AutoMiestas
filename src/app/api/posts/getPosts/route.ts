import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const posts = await prisma.posts.findMany();

        if (!posts) {
            return NextResponse.json({ status: 404, message: 'Posts not found' });
        }

        return NextResponse.json({ status: 200, data: posts });
    } catch (error) {
        console.log(`[getPosts]: ${error}`)
        return NextResponse.json({ status: 500, message: 'Couldnt get posts' })
    }
}