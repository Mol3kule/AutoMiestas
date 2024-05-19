'use client';

import { Categories, PostObj } from "@/classes/PostCategories";
import { Button } from "@/shadcn-components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/shadcn-components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn-components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn-components/ui/select";
import { useLanguage } from "@/lib/languageUtils";
import { useVehicleStore } from "@/store/vehicles/vehicle.store";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { VehicleObj } from "@/classes/Vehicle";

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
    const searchParams = useSearchParams();
    const router = useRouter();
    const t = useLanguage();

    const { vehicleMakes, vehicleModels } = useVehicleStore();

    const [isExpanded, setIsExpanded] = useState(false);
    const category = searchParams && searchParams.get("category") ? Number(searchParams.get("category")) : Categories.vehicle;
    const makeId = searchParams && searchParams.get("make") ? Number(searchParams.get("make")) : null;
    const modelId = searchParams && searchParams.get("model") ? Number(searchParams.get("model")) : null;

    const onCategoryChange = (value: number) => {
        if (value === category) return;
        router.push(`?category=${value}`);
    };

    const onMakeChange = (value: number) => {
        if (value === makeId) return;
        router.push(`?category=${category}&make=${value}`);
    };

    const onModelChange = (value: number) => {
        if (value === modelId) return;
        router.push(`?category=${category}&make=${makeId}&model=${value}`);
    };

    return (
        <div className={`flex flex-col gap-[0.87rem]`}>
            <div className={`w-full flex justify-between`}>
                <p className={`text-primary text-base full_hd:text-base_2xl`}>Paieška</p>
                <button className={`text-primary text-base full_hd:text-base_2xl underline`} onClick={() => setIsExpanded(prev => !prev)}>{isExpanded ? `Uždaryti` : `Detali paieška`}</button>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-4 gap-[1.25rem] px-[1.25rem] py-[1.25rem] bg-highlight_secondary rounded-[0.1875rem]`}>
                <FilterSelectorInput
                    value={category !== null ? category.toString() : ``}
                    items={Object.values(PostObj.getCategories()).map((objKey, idx) => ({ id: idx.toString(), label: t.post.categories[PostObj.getLabelByIndex(Number(objKey)) as keyof typeof t.post.categories] }))}
                    placeholder={t.general.category}
                    setValue={(value) => onCategoryChange(Number(value))}
                />
                {VehicleObj.isVehicleType(category) && (
                    <>
                        <PostCreateSelectInputSearchable
                            value={makeId !== null ? makeId.toString() : ``}
                            items={vehicleMakes.filter(make => make.type.includes(category)).map((make) => ({ id: make.id.toString(), label: make.make }))}
                            placeholder={t.vehicleInfo.objKeys.make}
                            setValue={(value) => onMakeChange(Number(value))}
                        />
                        <PostCreateSelectInputSearchable
                            value={modelId !== null ? modelId.toString() : ``}
                            items={makeId !== null ? Object.values(vehicleModels[makeId]).map((model) => ({ id: model.id.toString(), label: model.model })) : []}
                            placeholder={t.vehicleInfo.objKeys.model}
                            setValue={(value) => onModelChange(Number(value))}
                            isDisabled={makeId === null}
                        />
                    </>
                )}
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