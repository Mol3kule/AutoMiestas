"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { TVehicleModel } from "@/types/vehicle.type"
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export const FilterModelButton = ({ data, placeholder, updateData }: { data: TVehicleModel[], placeholder: string, updateData: Dispatch<SetStateAction<string | null>> }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
        >
          {value !== null ? value : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command>
          <CommandInput placeholder="Search" className={`text-[11px] text-[#111]`} />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup className={`max-h-[200px] overflow-auto`}>
            {data?.map((item) => (
              <CommandItem
                key={`model_filter_id_${item.make_id}_${item.label}`}
                onSelect={(currentValue) => {
                  updateData(currentValue)
                  setValue(currentValue);
                  setOpen(false);
                }}
                className={`text-[11px] text-[#111]`}
              >
                <Check className={cn("mr-2 h-4 w-4", value?.toLowerCase() === item.label.toLowerCase() ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}