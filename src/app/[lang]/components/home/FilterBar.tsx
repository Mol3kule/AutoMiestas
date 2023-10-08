"use client";

import { TVehicleMake } from '@/types/vehicle.type';
import { FilterMakeButton } from './_components/FilterMakeButton';
import { FilterModelButton } from './_components/FilterModelButton';
import { FilterPriceMin } from './_components/FilterPriceMin';
import { FilterPriceMax } from './_components/FilterPriceMax';
import { Button } from '@/components/ui/button';

const FilterBar = ({ makesData }: { makesData: TVehicleMake[] }) => {

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
                <FilterMakeButton data={makesData} placeholder={'Markė'} />
                {/* Maker model button */}
                <FilterModelButton placeholder={'Modelis'} />
                {/* Price min */}
                <FilterPriceMin placeholder={`Kaina nuo`} />
                {/* Price max */}
                <FilterPriceMax placeholder={`Kaina iki`} />
                {/* Search button */}
                <Button
                    type='button'
                    className={`flex-1 h-[30px]`}
                >
                    {`Ieškoti`}
                </Button>
            </div>
        </div>
    );
}

export default FilterBar;