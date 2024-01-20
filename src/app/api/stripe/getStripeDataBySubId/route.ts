import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const { subscriptionId } = await request.json();

        if (!subscriptionId) {
            return NextResponse.json({ status: 400, message: "Bad Request" });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

        const stripeData: any = await stripe.subscriptions.retrieve(subscriptionId);

        const { metadata } = await stripe.products.retrieve(stripeData.plan.product);

        return NextResponse.json({ status: 200, data: stripeData, metadata });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500 });
    }
}