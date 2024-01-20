import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const posts = await prisma.posts.findMany({
            where: {
                authorId: userId
            }
        });

        return NextResponse.json({ status: 200, data: posts });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}