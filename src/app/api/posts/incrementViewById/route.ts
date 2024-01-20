import prisma from "@/prisma/prisma";
import { PostStatistics } from "@/types/post.type";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        const { postId } = await request.json();

        if (!postId) {
            return NextResponse.json({ status: 400, message: "Bad Request" });
        }

        const { userId } = auth();

        if (userId) {
            const post = await prisma.posts.findUnique({
                where: {
                    id: postId
                }
            });

            if (!post) {
                return NextResponse.json({ status: 400, message: "Bad Request" });
            }

            const postStatistics = post.statistics as PostStatistics;
            const timesViewed = new Set([...postStatistics.times_viewed]);
            timesViewed.add(userId);

            await prisma.posts.update({
                where: {
                    id: postId
                },
                data: {
                    statistics: {
                        ...post.statistics as PostStatistics,
                        times_viewed: Array.from(timesViewed)
                    }
                }
            });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500 });
    }
}