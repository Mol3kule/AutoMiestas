"use client";

import { TVehicleMake, TVehicleModel } from '@/types/vehicle.type';
import { FilterMakeButton } from './_components/FilterMakeButton';
import { FilterModelButton } from './_components/FilterModelButton';
import { useEffect, useState } from 'react';

const FilterBar = ({ makesData }: { makesData: TVehicleMake[] }) => {
    const [makeId, setMakeId] = useState<number | null>(null);

    const [modelLabel, setModelLabel] = useState<string | null>(null);
    const [modelData, setModelData] = useState<TVehicleModel[]>([]);

    useEffect(() => {
        if (makeId == null) return;

        const uniqueVehicleSet = new Set<TVehicleModel>([]); // Set of model objects (no duplicates by label)

        const getModelsByMakeId: Promise<{ models: TVehicleModel[] }> = fetch(`http://localhost:3000/api/vehicleFilters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({ type: 'getModelsByMakeId', id: makeId })
        }).then(res => res.json());

        getModelsByMakeId?.then(async (response) => {
            const models = response.models;

            for (const model of models) {
                let isLabelInSet = false;

                // @ts-ignore
                for (const uniqueModel of uniqueVehicleSet) {
                    if (uniqueModel.label.toLowerCase() === model.label.toLowerCase()) {
                        isLabelInSet = true;
                        break;
                    }
                }

                if (!isLabelInSet) {
                    uniqueVehicleSet.add(model);
                }
            }

            setModelData(Array.from(uniqueVehicleSet));
        });
    }, [makeId]);

    return (
        <div className={`flex flex-col gap-[20px]`}>
            {/* Text */}
            <div className={`flex text-[#111] text-[11px] justify-between`}>
                <span>Paieška</span>
                <span className={`underline`}>Detali paieška</span>
            </div>
            {/* Filter buttons */}
            <div className={`flex gap-[15px] h-[70px] bg-[#F7F7F8] items-center px-[30px]`}>
                {/* Make button */}
                <FilterMakeButton data={makesData} placeholder={'Markė'} updateData={setMakeId} />
                {/* Maker model button */}
                <FilterModelButton data={modelData} placeholder={'Modelis'} updateData={setModelLabel} />
            </div>
        </div>
    );
}

export default FilterBar;