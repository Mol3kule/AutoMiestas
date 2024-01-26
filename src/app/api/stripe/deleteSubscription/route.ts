import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
    try {
        const { userId, getToken } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, message: "Unauthorized" });
        }

        const { postId }: { postId: number } = await request.json();

        if (typeof postId !== "number") {
            return NextResponse.json({ status: 400 });
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
            return NextResponse.json({ status: 404 });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
        try {
            await stripe.subscriptions.cancel(post.subscriptionId!);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ status: 500 });
        }

        // Delete images from S3
        const deleteImagesResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/posts/deleteImage`, { images: post.images }, { headers: { Authorization: `Bearer ${await getToken()}` } }).then(res => res.data);
        if (deleteImagesResponse.status !== 200) {
            console.log('Couldn\'t delete images from S3');
            return NextResponse.json({ status: 500 });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500 });
    }
};