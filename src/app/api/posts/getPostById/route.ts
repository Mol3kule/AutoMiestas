import { BodyType, Conditions, Drivetrains, FuelTypes, Rating, Tags, Transmissions, Types } from '@/classes/Vehicle';
import prisma from '@/prisma/prisma';
import { Post } from '@/types/post.type';
import { NextResponse } from 'next/server';

type PostData = {
    postId: number;
}

export const POST = async (request: Request) => {
    try {
        const { postId }: PostData = await request.json();

        const post = await prisma.posts.findFirst({
            where: {
                id: postId
            }
        })

        if (post) {
            return NextResponse.json({ status: 'success', post });
        }

        const DummyPost: Post = {
            id: postId,
            authorId: 'Dummy',
            information: {
                description: 'dummy description',
                location: {
                    city: 'Vilnius',
                    country: 'Lithuania'
                },
                vehicleData: {
                    type: Types.Car,
                    make: 'Porsche',
                    model: '911',
                    year: 2018,
                    body_type: BodyType.Coupe,
                    condition: Conditions.New,
                    fuel_type: FuelTypes.Gasoline,
                    drive_train: Drivetrains.RWD,
                    transmission: Transmissions.Automatic,
                    mileage: 39000,
                    technical_inspection_due_to: '2025-05-05',
                    vin: 'XAWDSAD1567WD'
                },
                price: 290000
            },
            images: [
                {
                    url: 'https://www.digitaltrends.com/wp-content/uploads/2018/05/porsche-2018-911-gt3-front-right-low.jpg?p=1',
                    isPrimary: true
                },
                {
                    url: 'https://www.motortrend.com/uploads/sites/5/2017/05/2018-Porsche-911-Carrera-4-GTS-rear-three-quarer.jpg',
                    isPrimary: false
                },
                {
                    url: 'https://www.amzs.si/uploads/gallery/14318/i216289.jpg',
                    isPrimary: false
                },
                {
                    url: 'https://images.cars.com/cldstatic/wp-content/uploads/img-2072756239-1540589495579.jpg',
                    isPrimary: false
                },
                {
                    url: 'https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/17q2/678295/2018-porsche-911-gt3-first-drive-review-car-and-driver-photo-680377-s-original.jpg',
                    isPrimary: false
                },
                {
                    url: 'https://media.ed.edmunds-media.com/porsche/911/2018/oem/2018_porsche_911_coupe_carrera-4-gts_fq_oem_1_1600.jpg',
                    isPrimary: false
                },
            ],
            periods: {
                time_created: Date.now(),
                time_updated: Date.now(),
                time_due: Date.now() + 100000
            },
            statistics: {
                times_viewed: [],
                times_displayed: 0,
                times_liked: []
            },
            tags: [
                Tags.HeatedSeats, Tags.LeatherSeats
            ],
            ratingByAuthor: {
                [Rating.Equipment]: 5,
                [Rating.Body]: 6,
            },
            boosts: {
                time_created: null,
                time_due: null
            }
        }

        // Create a dummy post
        return NextResponse.json({
            status: 'success',
            post: DummyPost
        });
    } catch (error) {
        console.log(`[posts/getPostById]: ${error}`);

        return NextResponse.json({
            status: 'error'
        });
    }
}