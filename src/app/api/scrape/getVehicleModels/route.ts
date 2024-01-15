import prisma from "@/prisma/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

export const GET = async () => {
    return;
    try {
        const makeList = await prisma.makes.findMany();

        makeList.forEach(async (makeListItem) => {
            for (let i = 0; i < 100; i++) {
                const { data } = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?select=make%2C%20model%2C%20year%2C%20displ%2C%20cylinders&where=make%3D%22${makeListItem.make}%22&limit=100&offset=${i}00`);

                data.results.forEach(async (item: { model: string, make: string, year: string, displ: number, cylinders: number }) => {
                    let make = await prisma.makes.findFirst({
                        where: {
                            make: item.make
                        }
                    });

                    if (!make) {
                        make = await prisma.makes.create({
                            data: {
                                make: item.make
                            }
                        });
                    }

                    const model = await prisma.make_models.findFirst({
                        where: {
                            make_id: make.id,
                            model: item.model
                        }
                    });

                    const vehicleYears: { [key: number]: { [modelId: number]: Set<Number> } } = {};

                    if (!model) {
                        const newModel = await prisma.make_models.create({
                            data: {
                                makes: { connect: { id: make.id } },
                                model: item.model,
                                year: JSON.stringify([item.year]),
                                engine_l: item.displ,
                                cylinders: item.cylinders
                            }
                        });

                        vehicleYears[make.id] = {
                            ...vehicleYears[make.id],
                            [newModel.id]: new Set([Number(item.year)])
                        }

                        await prisma.make_models.update({
                            where: {
                                id: newModel.id,
                                make_id: make.id,
                                model: item.model
                            },
                            data: {
                                year: JSON.stringify(Array.from(vehicleYears[make.id][newModel.id]))
                            }
                        });
                    } else {
                        const parsedYear = JSON.parse(model.year as any);
                        vehicleYears[make.id] ??= {};
                        vehicleYears[make.id][model.id] ??= new Set<number>([...parsedYear]);
                        vehicleYears[make.id][model.id].add(Number(item.year));

                        await prisma.make_models.update({
                            where: {
                                id: model.id,
                                make_id: make.id
                            },
                            data: {
                                year: JSON.stringify(Array.from(vehicleYears[make.id][model.id]))
                            }
                        });
                    }
                });
            }
        });

        return NextResponse.json({ status: 200});
    } catch (error) {
        console.log(`[getVehicleMakes]: ${error}`);
    }
};