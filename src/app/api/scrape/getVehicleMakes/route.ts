import prisma from "@/prisma/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    return;
    try {
        for (let i = 50; i < 150; i++) {
            const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?group_by=make&limit=100&offset=${i}00`);

            response.data.results.map(async (makeData: { make: string }) => {
                const isExist = await prisma.makes.findUnique({
                    where: {
                        make: makeData.make
                    }
                });

                if (!isExist) {
                    await prisma.makes.create({
                        data: {
                            make: makeData.make
                        }
                    });
                }
            });
            return NextResponse.json({ status: 200 });
        }
    } catch (error) {
        console.log(`[Scrape/getVehicleMakes]: ${error}`);
        NextResponse.json({ status: 500 });
    }
}