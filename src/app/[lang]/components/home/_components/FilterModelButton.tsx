"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/state/filters/filters.state";
import { TVehicleModel } from "@/types/vehicle.type"
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export const FilterModelButton = ({ placeholder }: { placeholder: string }) => {
  const [open, setOpen] = useState(false);
  const { makeId, model, setModel } = useFilterStore();
  const [vehicleModels, setVehicleModels] = useState<TVehicleModel[]>([]);

  useEffect(() => {
    if (makeId === null) return;
    const uniqueVehicleSet = new Set<TVehicleModel>([]); // Set of model objects (no duplicates by label)

    const getModelsByMakeId: Promise<{ models: TVehicleModel[] }> = fetch(`http://localhost:3000/api/vehicleFilters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify({ type: 'getModelsByMakeId', data: { id: makeId } })
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

      setVehicleModels(Array.from(uniqueVehicleSet));
    });
  }, [makeId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full flex-1 h-[30px] justify-between bg-[#FFF] font-normal text-[11px] text-[#111]"
        >
          {model !== null ? model : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" size={10} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex-1 p-0">
        <Command>
          <CommandInput placeholder="Search" className={`text-[11px] text-[#111]`} />
          <CommandGroup className={`max-h-[200px] overflow-auto`}>
            {vehicleModels?.map((item) => (
              <CommandItem
                key={`model_filter_id_${item.make_id}_${item.label}`}
                onSelect={(currentValue) => {
                  setModel(currentValue);
                  setOpen(false);
                }}
                className={`text-[11px] text-[#111]`}
              >
                <Check className={cn("mr-2 h-4 w-4", model?.toLowerCase() === item.label.toLowerCase() ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}