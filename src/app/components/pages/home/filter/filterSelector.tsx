'use client';

import { PostObj } from "@/classes/PostCategories";
import { Button } from "@/shadcn-components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/shadcn-components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn-components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn-components/ui/select";
import { useLanguage } from "@/lib/languageUtils";
import { useFilterStore } from "@/store/filter/filter.store";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type TInputProps = {
    value: string,
    placeholder?: string,
    isDisabled?: boolean,
    compareToId?: boolean,
    setValue?: (value: string) => void
}

type TInputSelectProps = TInputProps & {
    items: Array<{ id: string, label: string }> | []
}

export const FilterSelector = () => {
    const router = useRouter();
    const { category, makeId, modelId, setCategory, setMakeId, setModelId } = useFilterStore();
    const { vehicleMakes, vehicleModels } = useVehicleStore();

    const t = useLanguage();

    return (
        <div className={`flex flex-col gap-[0.87rem]`}>
            <div className={`w-full flex justify-between`}>
                <p className={`text-primary text-base full_hd:text-base_2xl`}>Paieška</p>
                <p className={`text-primary text-base full_hd:text-base_2xl underline`}>Detali paieška</p>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-4 gap-[1.25rem] px-[1.25rem] py-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <FilterSelectorInput
                    value={category !== null ? category.toString() : ``}
                    items={Object.values(PostObj.getCategories()).map((objKey, idx) => ({ id: idx.toString(), label: t.post.categories[PostObj.getLabelByIndex(Number(objKey)) as keyof typeof t.post.categories] }))}
                    placeholder={t.general.category}
                    setValue={(value) => setCategory(Number(value))}
                />
                <PostCreateSelectInputSearchable
                    value={makeId !== null ? makeId.toString() : ``}
                    items={vehicleMakes.map((make) => ({ id: make.id.toString(), label: make.make }))}
                    placeholder={t.vehicleInfo.objKeys.make}
                    setValue={(value) => setMakeId(Number(value))}
                />
                <PostCreateSelectInputSearchable
                    value={makeId !== null ? modelId.toString() : ``}
                    items={makeId !== null ? Object.values(vehicleModels[makeId]).map((model) => ({ id: model.id.toString(), label: model.model })) : []}
                    placeholder={t.vehicleInfo.objKeys.model}
                    setValue={(value) => setModelId(Number(value))}
                />
                <button type={`button`} className={`flex items-center justify-center py-[0.69rem] bg-primary rounded-[0.1875rem] text-[#FFF] text-base full_hd:text-base_2xl`}>
                    {t.general.search}
                </button>
            </div>
        </div >
    )
};

const FilterSelectorInput = ({ value, items, placeholder, isDisabled = false, compareToId = true, setValue }: TInputSelectProps) => {
    return (
        <Select onValueChange={setValue} disabled={isDisabled} value={value}>
            <SelectTrigger className={`capitalize text-base full_hd:text-base_2xl bg-[#FFF] rounded-[0.1875rem] h-full px-[1.56rem] py-[0.69rem] border-none focus:ring-0 focus:ring-offset-0`}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={`border-none bg-[#FFF]`}>
                {items.map((item, idx) => (
                    <SelectItem
                        value={item.id}
                        key={`${item}_${idx}`}
                        className={`text-base full_hd:text-base_2xl rounded-[0.1875rem] capitalize ${compareToId ? value === item.id ? `bg-highlight_secondary` : `` : value.toLowerCase() === item.label.toLowerCase() ? `bg-highlight_secondary` : ``}`}
                    >{item.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export const PostCreateSelectInputSearchable = ({ value, items, placeholder = "----", isDisabled = false, setValue }: TInputSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild disabled={isDisabled}>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isOpen}
                    className={`rounded-[0.1875rem] border-none font-normal bg-[#FFF] relative h-full text-base full_hd:text-base_2xl justify-between px-[1.56rem] py-[0.69rem]`}
                >
                    {value.length <= 0 ? placeholder : items.find((item) => item.id === value)?.label}
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`bg-[#FFF] border-none min-w-[100%] w-[var(--radix-popover-trigger-width)]`}>
                <Command>
                    <CommandInput placeholder={`Ieškoti...`} className={`text-base full_hd:text-base_2xl`} />
                    <CommandEmpty className={`text-base full_hd:text-base_2xl text-center pt-[1rem]`}>Nieko neradome.</CommandEmpty>
                    <CommandGroup className={`border-none max-h-[15rem] full_hd:max-h-[20rem] overflow-y-auto`}>
                        {items.map((item, idx) => (
                            <CommandItem
                                key={`${item}_${idx}`}
                                value={item.label}
                                onSelect={() => {
                                    if (setValue) { setValue(item.id); }
                                    setIsOpen(false);
                                }}
                                className={`flex items-center text-base full_hd:text-base_2xl rounded-[0.1875rem] ${value === item.id ? `bg-highlight_secondary` : ``}`}
                            >
                                <Check className={`mr-2 h-4 w-4 ${value === item.id ? "opacity-100" : "opacity-0"}`} />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}