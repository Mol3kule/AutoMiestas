import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prisma from '@/prisma/prisma';

export const POST = async (request: NextRequest) => {
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

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const { priceId, postId } = await request.json();

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: user.stripeCustomerId,
            success_url: `${process.env.defaultApiEndpoint}`,
            cancel_url: `${process.env.defaultApiEndpoint}/paymentFailed`,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            metadata: {
                payingUserId: user.userId,
                postId
            }
        });

        if (!session.url) {
            return NextResponse.json({ status: 500, message: 'Could not create session' });
        }

        return NextResponse.json(session.url);
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`);
        return NextResponse.json({ status: 'error' });
    }
}