import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/state/filters/filters.state";
import { ChangeEvent } from "react";

export const FilterPriceMin = ({ placeholder }: { placeholder: string }) => {
    const { price, setPrice } = useFilterStore();
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        const newValue = event.target.value;
        console.log(newValue)
        setPrice({ ...price, min: Number(newValue) });
    }

    return (
        <Input
            type="number"
            className="w-[170px] h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
            placeholder={placeholder}
            onChange={handleOnChange}
            value={price.min!}

            // min={0}
        />
    )
};