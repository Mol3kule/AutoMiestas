import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import Stripe from "stripe";
import { getPostById } from "@/actions/posts/post.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);

        if (!event) {
            console.log(`⚠️ Webhook signature verification failed.`)
            return NextResponse.json({ status: 500 });
        }

        // getting to the data we want from the event
        const subscription = event.data.object as any;
        const subscriptionId = subscription.id;

        switch (event.type) {
            case "invoice.paid": {
                const { postId, userId } = subscription.subscription_details.metadata;
                await prisma.posts.update({
                    where: {
                        id: Number(postId),
                        authorId: userId
                    },
                    data: {
                        subscriptionId: subscription.subscription,
                        isSubscriptionActive: true
                    }
                });
                break;
            }
            case "customer.subscription.deleted": {
                await prisma.posts.delete({
                    where: {
                        id: Number(subscription.metadata.postId),
                        authorId: subscription.metadata.userId,
                        subscriptionId: subscriptionId
                    }
                });
                break;
            }
            // To do: handle subscription expiration
            default: {
                // console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
            }
        }

        return NextResponse.json({ status: 200 });
    } catch {
        return NextResponse.json({ status: 500 });
    }
}