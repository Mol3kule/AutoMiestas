import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    try {
        const { postId, vehicleString, timestamp } = await request.json();
        const vehicleDestructured: String[] = vehicleString.split('-');

        const post = await prisma.posts.findFirst({
            where: {
                id: postId,
                periods: {
                    path: '$.periods',
                    equals: timestamp
                },
                AND: [
                    {
                        information: {
                            path: '$.vehicleData.make',
                            equals: vehicleDestructured[0].toString()
                        }
                    },
                    {
                        information: {
                            path: '$.vehicleData.model',
                            equals: vehicleDestructured[1].toString()
                        }
                    },
                    {
                        information: {
                            path: '$.vehicleData.year',
                            equals: vehicleDestructured[2].toString()
                        }
                    }
                ]
            }
        });

        if (post) {
            return NextResponse.json({ status: 'success', post });
        }

        return NextResponse.json({ status: 'error', message: 'Skelbimas nerastas arba puslapis nepasiekiamas' });
    } catch (error) {
        console.log(`[getPostByParams]: ${error}`)
        return NextResponse.json({ status: 'error' });
    }
}