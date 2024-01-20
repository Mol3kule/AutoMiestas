import prisma from "@/prisma/prisma";
import { auth, clerkClient } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const { firstName, lastName } = await request.json();

        if (!firstName || !lastName) {
            return NextResponse.json({ status: 400, translation: 'bad_request' });
        };

        const user = await clerkClient.users.updateUser(userId, {
            firstName: firstName,
            lastName: lastName
        });

        await prisma.users.update({
            where: {
                userId: userId
            },
            data: {
                first_name: user.firstName!,
                last_name: user.lastName!
            }
        });
        
        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({ status: 500, translation: 'server_error' });
    }
}