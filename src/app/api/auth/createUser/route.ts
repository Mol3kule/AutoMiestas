import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const POST = async (request: Request) => {
    try {
        const { userId, emailAddress, first_name, last_name, phone_number, organization } = await request.json();

        const isRegistered = await prisma.users.findFirst({
            where: {
                userId: userId
            }
        });

        if (!isRegistered) {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

            await stripe.customers.create({
                email: emailAddress
            }).then(async (customer) => {
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
            });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(`[createUser]: ${error}`);
    }
}