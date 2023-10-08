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
            className="flex-1 h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111] focus-visible:ring-transparent border-none"
            placeholder={placeholder}
            onChange={handleOnChange}
            value={price.max}
            min={0}
        />
    )
};