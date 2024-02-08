"use server";

import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { createCustomer } from "../stripe/stripe.actions";

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

export const createUser = async (userId: string, emailAddress: string, first_name: string, last_name: string, phone_number: string, organization: string) => {
    const isRegistered = await prisma.users.findFirst({
        where: {
            userId: userId
        }
    });

    if (isRegistered) return { status: 200, message: "User already registered" };
    const { status, customer } = await createCustomer(userId);

    if (status !== 200 || !customer) return { status, message: "Could not create customer" };

    await prisma.users.create({
        data: {
            userId,
            stripeCustomerId: customer.id,
            email: emailAddress,
            first_name: first_name ?? '',
            last_name: last_name ?? '',
            phone_number: phone_number ?? '',
            organization: organization ?? ''
        }
    });

    return { status: 200 };
}