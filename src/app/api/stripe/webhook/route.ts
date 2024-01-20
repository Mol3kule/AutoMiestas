import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        // getting to the data we want from the event
        const subscription = event.data.object as Stripe.Subscription;
        const subscriptionId = subscription.id;

        switch (event.type) {
            case "customer.subscription.created": {
                await prisma.posts.update({
                    where: {
                        id: Number(subscription.metadata.postId),
                        authorId: subscription.metadata.userId
                    },
                    data: {
                        subscriptionId: subscriptionId,
                        isActive: true,
                        isSubscriptionActive: true
                    }
                });
                break;
            }
            case "customer.subscription.deleted": {
                await prisma.posts.update({
                    where: {
                        id: Number(subscription.metadata.postId),
                        subscriptionId: subscriptionId
                    },
                    data: {
                        isSubscriptionActive: false
                    }
                });
                break;
            }
            default: {
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
            }
        }

        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({ received: true });
    } catch {
        return NextResponse.json({ error: { message: `Method Not Allowed`, }, }, { status: 405 }).headers.set("Allow", "POST");
    }
}