"use server";

import Stripe from 'stripe';
import { auth } from '@clerk/nextjs';
import prisma from '@/prisma/prisma';

export type TProduct = {
    id: string;
    name: string;
    unit_amount: number;
}

export const createCheckoutSession = async (priceId: string, postId: number) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, error: 'Unauthorized' };
        }

        const user = await prisma.users.findUnique({
            where: {
                userId: userId
            }
        });

        if (!user) {
            return { status: 404, error: 'User not found' };
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: user.stripeCustomerId,
            success_url: `${process.env.defaultApiEndpoint}/my_posts`,
            cancel_url: `${process.env.defaultApiEndpoint}/paymentFailed`,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            subscription_data: {
                metadata: {
                    userId: user.userId,
                    postId
                }
            }
        });

        if (!session.url) {
            return { status: 500, error: 'Could not create session' };
        }

        return { status: 200, url: session.url };
    } catch (error) {
        console.log(`[createCheckoutSession]: ${error}`);
        return { status: 500, error };
    }
};

export const getProducts = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, error: 'Unauthorized' };
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const products = await stripe.products.list({ limit: 3 });
        const prices = await stripe.prices.list({ limit: 3 });

        const productsWithPrices = products.data.map((product) => {
            const price = prices.data.find((price) => price.id === product.default_price);
            if (!price) return;

            return {
                id: price.id,
                name: product.name,
                unit_amount: price.unit_amount
            }
        })

        return { status: 200, products: productsWithPrices };
    } catch (error) {
        console.log(`[getProducts]: ${error}`);
        return { status: 500, error };
    }
};