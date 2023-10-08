import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/state/filters/filters.state";
import { ChangeEvent } from "react";

export const FilterPriceMax = ({ placeholder }: { placeholder: string }) => {
    const { price, setPrice } = useFilterStore();
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setPrice({ ...price, max: newValue });
    }

    return (
        <Input
            type="number"
            className="w-[170px] h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111] outline-none"
            placeholder={placeholder}
            onChange={handleOnChange}
            value={price.max}
            min={0}
        />
    )
};