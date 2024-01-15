import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return NextResponse.json({ status: 401, error: 'Unauthorized' });
        }

        const { category, makeId, modelId, modelYear,
            bodyType, mileage, fuelType, drivetrain,
            transmission, sw_side, condition, price,
            technical_inspection_due, vin, sdk, description,
            images, country, city
        } = await req.json();

        const postData = {
            information: {
                description,
                location: {
                    city,
                    country
                },
                vehicleData: {
                    make: makeId,
                    model: modelId,
                    year: modelYear,
                    body_type: bodyType,
                    condition,
                    fuel_type: fuelType,
                    drive_train: drivetrain,
                    transmission,
                    mileage,
                    technical_inspection_due_to: technical_inspection_due,
                    sdk,
                    sw_side,
                    vin
                } as any,
                price
            },
            images,
            statistics: {
                times_displayed: 0,
                times_liked: [],
                times_viewed: []
            },
            tags: [],
            boosts: {
                time_created: null,
                time_due: null
            },
            periods: {
                time_created: Date.now(),
                time_due: Date.now(),
                time_updated: Date.now()
            },
            ratingByAuthor: {
                "0": 10, "1": 9
            },
            category: category,
        }

        const createResponse = await prisma.posts.create({
            data: {
                authorRelation: { connect: { userId } },
                ...postData,
                subscriptionId: '',
                isActive: false,
                isVerified: false
            },
        });
        // add a response
        return NextResponse.json({ status: 200, postId: createResponse.id });
    } catch (error) {
        console.log(`[createPost]: ${error}`);
        return NextResponse.json({ status: 500 });
    }
}