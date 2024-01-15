import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

export type TProduct = {
    id: string;
    name: string;
    unit_amount: number;
}

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const products = await stripe.products.list({ limit: 3 });
        const prices = await stripe.prices.list({ limit: 3 });

        const productsWithPrices = products.data.map((product) => {
            const price = prices.data.find((price) => price.id === product.default_price);
            return {
                id: price?.id,
                name: product.name,
                unit_amount: price?.unit_amount
            }
        })

        return NextResponse.json({ products: productsWithPrices });
    } catch (error) {
        console.log(`[getProducts]: ${error}`);
        return NextResponse.json({ status: 'error' });
    }
}