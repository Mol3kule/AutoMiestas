"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/state/filters/filters.state";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export const FilterYearFrom = ({ placeholder }: { placeholder: string }) => {
    const [open, setOpen] = useState(false);
    const { yearFrom, getVehicleYears, setYearFrom } = useFilterStore();

    const [modelYears, setModelYears] = useState<Number[]>([]);

    useEffect(() => {
        const initData = async () => {
            const years = await getVehicleYears();
            setModelYears(years);
        }
        initData();
    }, []);


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full flex-1 h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
                >
                    {yearFrom !== null ? yearFrom : placeholder}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" size={10} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex-1 p-0">
                <Command>
                    <CommandInput placeholder="" className={`text-[11px] text-[#111]`} />
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup className={`max-h-[200px] overflow-auto`}>
                        {modelYears?.map((year) => (
                            <CommandItem
                                key={`model_year_from_${year}`}
                                onSelect={(currentValue) => {
                                    setOpen(false);
                                }}
                                className={`text-[11px] text-[#111]`}
                            >
                                <Check className={cn("mr-2 h-4 w-4", yearFrom === year ? "opacity-100" : "opacity-0")} />
                                {year.toString()}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}