import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

import motoBrands from "./moto_brands.json";
import motoModels from "./moto_models.json";

export const GET = async () => {
    try {
        motoBrands.data.forEach(async (brand) => {
            const doesExist = await prisma.makes.findUnique({
                where: {
                    make: brand.name
                }
            });

            if (doesExist) {
                const brandData = motoBrands.data.find((brand) => brand.name === doesExist.make);
                if (brandData) {
                    const motoBrandsByMakeId = motoModels.data.filter((model) => model.brand_id === brandData.id);
                    motoBrandsByMakeId.forEach(async (item) => {
                        await prisma.make_models.create({
                            data: {
                                make_id: doesExist.id,
                                model: item.name,
                                type: JSON.stringify([1])
                            }
                        })
                    });
                }
            }
        });

        return NextResponse.json({ status: 200 });
    } catch (error) {
        return NextResponse.json({ status: 500, error });
    }
}