"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";

export const getUser = async () => {
    const { userId } = auth();

    if (!userId) return null;

    return await prisma.users.findUnique({
        where: {
            userId
        }
    });
}

export const getUserById = async (userId: string) => {
    if (!userId) return { status: 400, message: "Bad Request" };

    const userData = await prisma.users.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userData) return { status: 404, message: "User not found" };

    return { status: 200, data: userData };
};