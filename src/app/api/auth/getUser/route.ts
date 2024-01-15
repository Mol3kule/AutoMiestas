import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const user = await prisma.users.findUnique({
            where: {
                userId: userId
            }
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        return NextResponse.json({ status: 200, data: user });
    } catch (error) {
        console.log(`[getUser]: ${error}`);
        return NextResponse.json({ status: 500 });
    }
}