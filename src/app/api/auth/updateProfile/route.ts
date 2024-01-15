import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const { userData } = await request.json();

        await prisma.users.update({
            where: {
                userId: userId
            },
            data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone_number: userData.phone_number,
            }
        })
    } catch (error) {
        console.log(error);
        NextResponse.json({ status: 500 });
    }
}