"use server";

import prisma from "@/prisma/prisma";
import { auth, clerkClient } from "@clerk/nextjs";
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

export const createUser = async (userId: string, emailAddress: string, first_name: string | null, last_name: string | null, phone_number: string | null, organization: string | null) => {
    const isRegistered = await prisma.users.findFirst({
        where: {
            userId: userId
        }
    });

    if (isRegistered) return { status: 200, message: "User already registered" };
    const { status, customer } = await createCustomer(emailAddress);

    if (status !== 200 || !customer) return { status, message: "Could not create customer" };

    const isPhoneTaken = phone_number ? await isUserPhoneTaken(phone_number) : false;

    await prisma.users.create({
        data: {
            userId,
            stripeCustomerId: customer.id,
            email: emailAddress,
            first_name: first_name,
            last_name: last_name,
            phone_number: isPhoneTaken ? null : phone_number,
            organization: organization
        }
    });

    return { status: 200 };
};

export const isUserPhoneTaken = async (phone_number: string) => {
    const userList = await clerkClient.users.getUserList();

    const isInClerk = userList.find((user) => {
        user.phoneNumbers.forEach((phoneData) => {
            if (phoneData.phoneNumber === phone_number) return true;
        });
    });

    const isInDb = await prisma.users.findFirst({
        where: {
            phone_number
        }
    });

    return !!isInClerk && !!isInDb;
};

export const updateUserName = async (first_name: string, last_name: string) => {
    const { userId } = auth();

    if (!userId) return { status: 400, error: "Bad Request" };

    await prisma.users.update({
        where: {
            userId
        },
        data: {
            first_name,
            last_name
        },
    });

    await clerkClient.users.updateUser(userId, { firstName: first_name, lastName: last_name });

    return { status: 200 };
};