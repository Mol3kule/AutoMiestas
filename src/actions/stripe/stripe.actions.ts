"use server";

import Stripe from 'stripe';
import { auth } from '@clerk/nextjs';
import prisma from '@/prisma/prisma';
import { deleteImages } from '../s3/s3.actions';
import { PostImage } from '@/types/post.type';

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

export const getSubscription = async (subscriptionId: string) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, translation: 'unauthorized' };
        }

        if (!subscriptionId) {
            return { status: 400, translation: "bad_request" };
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string);

        const subscriptionData = {
            id: subscription.id,
            current_period_end: subscription.current_period_end,
        }

        const productData = {
            id: product.id,
            name: product.name,
            metadata: product.metadata
        }

        return { status: 200, subscription: subscriptionData ?? {}, product: productData ?? {} };
    } catch (error) {
        console.log(`[getSubscription]: ${error}`);
        return { status: 500, error };
    }
};

export const deleteSubscription = async (postId: number) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, error: "Unauthorized" };
        }

        if (typeof postId !== "number") {
            return { status: 400, error: 'Bad request' };
        }

        const post = await prisma.posts.findUnique({
            where: {
                id: postId,
                authorId: userId
            },
            select: {
                id: true, subscriptionId: true, images: true
            }
        });

        if (!post) {
            return { status: 404, error: 'Post not found' };
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        await stripe.subscriptions.cancel(post.subscriptionId!);

        const deleteImagesResponse = await deleteImages(post.images as PostImage[]);
        if (deleteImagesResponse.status !== 200) {
            return { status: 500, error: deleteImagesResponse.message };
        }

        return { status: 200 };
    } catch (error) {
        console.log(`[deleteSubscription]: ${error}`);
        return { status: 500, error };
    }
};

export const createCustomer = async (email: string) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const customer = await stripe.customers.create({
            email
        });
        return { status: 200, customer };
    } catch (error) {
        console.log(`[createCustomer]: ${error}`);
        return { status: 500, error };
    }
}