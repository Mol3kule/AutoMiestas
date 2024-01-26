import prisma from "@/prisma/prisma";
import { PostStatus } from "@/types/post.type";
import { auth } from "@clerk/nextjs";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, error: "Unauthorized" });
        }

        const posts = await prisma.posts.findMany();

        const active = await Promise.all(posts.filter((post) => {
            const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

            return isPublished && !isAttentionRequired && !isEditedAfterAttentionRequired;
        }));
        
        const inactive = await Promise.all(posts.filter((post) => {
            const { isPublished, isAttentionRequired, isEditedAfterAttentionRequired } = post.status as PostStatus;

            return !isPublished && isAttentionRequired && isEditedAfterAttentionRequired;
        }));

        return NextResponse.json({ status: 200, active, inactive });
    } catch (error) {
        console.log(`[getPosts]: ${error}`);
        return NextResponse.json({ status: 500, error });
    }
}