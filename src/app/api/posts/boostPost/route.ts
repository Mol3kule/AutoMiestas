import prisma from "@/prisma/prisma";
import { PostBoosts, PostStatus } from "@/types/post.type";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const { postId }: { postId: number | undefined } = await request.json();

        if (!postId) {
            return NextResponse.json({ status: 400, translation: "bad_request" });
        }

        const post = await prisma.posts.findUnique({
            where: {
                id: postId,
            }
        });

        if (!post) {
            return NextResponse.json({ status: 400, translation: "bad_request" });
        }

        const { isPublished } = JSON.parse(post.status as any) as PostStatus;

        if (!isPublished) {
            return NextResponse.json({ status: 400, translation: "post_not_active" });
        }

        const postBoost = post.boosts as PostBoosts;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        const stripeSubscriptionData: any = await stripe.subscriptions.retrieve(post.subscriptionId!);

        const { metadata } = await stripe.products.retrieve(stripeSubscriptionData.plan.product);

        const nextBoostAtTimestamp = new Date(Number(postBoost.time_created)).setDate(new Date(Number(postBoost.time_created)).getDate() + Number(metadata.boost_timeout));

        if (!postBoost.time_created || nextBoostAtTimestamp < Date.now()) {
            await prisma.posts.update({
                where: {
                    id: post.id
                },
                data: {
                    boosts: {
                        time_created: Date.now(),
                    }
                }
            });
        } else {
            return NextResponse.json({ status: 400, translation: "post_boost_cooldown" });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500 });
    }
}