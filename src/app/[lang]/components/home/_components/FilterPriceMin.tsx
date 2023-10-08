import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react";

export const FilterPriceMin = () => {
    const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
    return (
        <Popover open={isPopupOpen} onOpenChange={setPopupOpen}>
            <PopoverTrigger asChild>
                <Input
                    type="number"
                    role="combobox"
                    // aria-expanded={isPopupOpen}
                    className="w-[170px] h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
                >
                    {/* {model !== null ? model : placeholder} */}
                    {/* <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" size={10} /> */}
                </Input>
            </PopoverTrigger>
            <PopoverContent className="w-[170px] p-0">
                <Command>
                    <CommandGroup className={`max-h-[200px] overflow-auto`}>
                        {/* {vehicleModels?.map((item) => ( */}
                        <CommandItem
                            // key={`model_filter_id_${item.make_id}_${item.label}`}
                            onSelect={(currentValue) => {
                                // setModel(currentValue);
                                setPopupOpen(false);
                            }}
                            className={`text-[11px] text-[#111]`}
                        >
                            {/* <Check className={cn("mr-2 h-4 w-4", model?.toLowerCase() === item.label.toLowerCase() ? "opacity-100" : "opacity-0")} />
                                {item.label} */}
                        </CommandItem>
                        {/* ))} */}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
};