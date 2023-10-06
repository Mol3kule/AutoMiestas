"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { TVehicleMake } from "@/types/vehicle.type"
import { Check, ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export const FilterMakeButton = ({ data, placeholder, updateData }: { data: TVehicleMake[], placeholder: string, updateData: Dispatch<SetStateAction<number | null>>}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[170px] h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
        >
          {value !== null ? data.find((item) => item.id === value)?.make : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[170px] p-0">
        <Command>
          <CommandInput placeholder="" className={`text-[11px] text-[#111]`} />
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup className={`max-h-[200px] overflow-auto`}>
            {data.map((item) => (
              <CommandItem
                key={`make_id_${item.id}`}
                onSelect={(currentValue) => {
                  const makerData = data.find((searchItem) => searchItem.make.toLowerCase() === currentValue.toLowerCase());
                  setValue(makerData?.id ?? null);
                  updateData(makerData?.id ?? null);
                  setOpen(false);
                }}
                className={`text-[11px] text-[#111]`}
              >
                <Check className={cn("mr-2 h-4 w-4", value === item.id ? "opacity-100" : "opacity-0")} />
                {item.make}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}