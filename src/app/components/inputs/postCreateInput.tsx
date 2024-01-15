'use client';

import { useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type TInputProps = {
    label: string,
    value: string,
    placeholder?: string,
    isDisabled?: boolean,
    compareToId?: boolean,
    setValue?: (value: string) => void
}

type TInputSelectProps = TInputProps & {
    items: Array<{ id: string, label: string }> | []
}

export const PostCreateInputText = ({ label, value, placeholder = "----", isDisabled = false, setValue }: TInputProps) => {
    return (
        <div className={`flex flex-col gap-[0.85rem]`}>
            <span className={`text-primary text-base full_hd:text-base_2xl`}>{label}</span>
            <input
                type={`text`}
                className={`${value.length <= 0 ? `border-error_third` : `border-highlight text-highlight`} bg-[#FFF] rounded-[0.1875rem] px-[1.56rem] py-[0.69rem] text-base full_hd:text-base_2xl focus:outline-none border-l-[0.125rem] placeholder:text-placeholder`}
                value={value}
                placeholder={placeholder}
                disabled={isDisabled}
                onChange={(e) => setValue && setValue(e.target.value)}
            />
        </div>
    )
}

export const PostCreateSelectInput = ({ label, value, items, placeholder = "----", isDisabled = false, compareToId = true, setValue }: TInputSelectProps) => {
    return (
        <div className={`flex flex-col gap-[0.85rem]`}>
            <span className={`text-primary text-base full_hd:text-base_2xl`}>{label}</span>
            <Select onValueChange={setValue} disabled={isDisabled} value={value}>
                <SelectTrigger className={`${value.length <= 0 ? `border-error_third` : `border-highlight text-highlight`} capitalize text-base full_hd:text-base_2xl bg-[#FFF] rounded-[0.1875rem] h-full px-[1.56rem] py-[0.69rem] border-l-[0.125rem] border-t-0 border-r-0 border-b-0 focus:ring-0 focus:ring-offset-0`}>
                    <SelectValue placeholder={placeholder} className="placeholder:text-highlight" />
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
        </div>
    );
};

export const PostCreateSelectInputSearchable = ({ label, value, items, placeholder = "----", isDisabled = false, setValue }: TInputSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const RenderInput = useMemo(() => () => (
        <div className={`flex flex-col gap-[0.85rem]`}>
            <span className={`text-primary text-base full_hd:text-base_2xl`}>{label}</span>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild disabled={isDisabled}>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className={`${value.length <= 0 ? `border-error_third` : `border-highlight text-highlight`} rounded-[0.1875rem] border-l-[0.125rem] border-t-0 border-r-0 border-b-0 bg-[#FFF] relative h-full text-base full_hd:text-base_2xl justify-between px-[1.56rem] py-[0.69rem]`}
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
                                    <Check
                                        className={`mr-2 h-4 w-4 ${value === item.id ? "opacity-100" : "opacity-0"}`}
                                    />
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    ), [value, items, isOpen]);


    return (
        <RenderInput />
    );
}