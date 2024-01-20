import prisma from "@/prisma/prisma";
import { PostStatistics } from "@/types/post.type";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, translation: "user_not_logged_in" });
        }

        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json({ status: 400, translation: "request_error" });
        }

        const post = await prisma.posts.findUnique({
            where: {
                id: postId
            },
        });

        if (!post) {
            return NextResponse.json({ status: 200, translation: "request_error" });
        }

        const stats = post.statistics as PostStatistics;

        if (stats.times_liked.includes(userId)) {
            await prisma.posts.update({
                where: {
                    id: postId
                },
                data: {
                    statistics: {
                        ...stats,
                        times_liked: stats.times_liked.filter(uId => uId !== userId)
                    }
                }
            });
            return NextResponse.json({ status: 200, translation: "post_disliked" });
        }

        await prisma.posts.update({
            where: {
                id: postId
            },
            data: {
                statistics: {
                    ...stats,
                    times_liked: [...stats.times_liked, userId]
                }
            }
        });

        return NextResponse.json({ status: 200, translation: "post_liked" });
    } catch (error) {
        console.log(`[setFavoriteById]: ${error}`);
        return NextResponse.json({ status: 500, translation: "internal_server_error" });
    }
}