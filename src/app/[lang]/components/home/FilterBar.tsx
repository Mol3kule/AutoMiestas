"use client";

import { TVehicleMake } from '@/types/vehicle.type';
import { FilterMakeButton } from './_components/FilterMakeButton';
import { FilterModelButton } from './_components/FilterModelButton';
import { FilterPriceMin } from './_components/FilterPriceMin';
import { FilterPriceMax } from './_components/FilterPriceMax';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FilterYearFrom } from './_components/FilterYearFrom';

const FilterBar = ({ makesData }: { makesData: TVehicleMake[] }) => {
    const [isDetailedFilters, setDetailedFilters] = useState<boolean>(false);

    return (
        <div className={`flex flex-col gap-[20px]`}>
            {/* Text */}
            <div className={`flex text-[#111] text-[11px] justify-between`}>
                <span>Paieška</span>
                <span className={`underline`} onClick={() => setDetailedFilters((prev) => !prev)}>Detali paieška</span>
            </div>
            {/* Filter buttons */}
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-[15px] py-[20px] bg-[#F7F7F8] items-center px-[30px]`}>
                {/* Make button */}
                <FilterMakeButton data={makesData} placeholder={'Markė'} />
                {/* Maker model button */}
                <FilterModelButton placeholder={'Modelis'} />
                {/* Price min */}
                <FilterPriceMin placeholder={`Kaina nuo`} />
                {/* Price max */}
                <FilterPriceMax placeholder={`Kaina iki`} />
                {/* Search button */}
                <Button type='button' className={`w-full flex-1 h-[30px]`}>{`Ieškoti`}</Button>
                {/* Additional filters */}
                {isDetailedFilters && (
                    <FilterYearFrom placeholder={`Metai nuo`} />
                )}
            </div>
        </div>
    );
}

export default FilterBar;