"use client";

import { X } from "lucide-react";
import { ModalWrapper } from "../wrappers/modal-wrapper";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/languageUtils";
import PostErrors from "@/classes/PostErrors";
import { useQuery } from "@tanstack/react-query";

type StopPostProps = {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    onSelect: ({ type, errors }: { type: number, errors: Number[] }) => void;
}

export const StopPostModal = ({ isOpen, setOpen, onSelect }: StopPostProps) => {
    const [activeType, setActiveType] = useState<number>(null!);
    const [activeErrorsByType, setActiveErrorsByType] = useState<Number[]>([null!]);
    const { errors, dialog } = useLanguage();

    const PostErrorTypes = PostErrors.getErrorTypes();

    useEffect(() => {
        setActiveType(null!);
        setActiveErrorsByType([]);
    }, [isOpen]);

    const { isLoading, data: errorsByType } = useQuery({
        queryKey: ["getPostErrorsByType", { activeType }],
        queryFn: async () => {
            if (typeof activeType !== 'number') return null;
            return PostErrors.getErrorsByType(activeType as keyof typeof PostErrorTypes);
        }
    });

    const HandleTypeChange = (value: number) => {
        setActiveType(value);
        setActiveErrorsByType([]);
    };

    const HandleErrorSelect = (value: number) => {
        if (activeErrorsByType.includes(value)) {
            setActiveErrorsByType(activeErrorsByType.filter((error) => error !== value));
        } else {
            setActiveErrorsByType([...activeErrorsByType, value]);
        }
    }

    return (
        <ModalWrapper isOpen={isOpen} setOpen={setOpen}>
            <div className={`flex items-center justify-center`}>
                <div className={`flex flex-col gap-[1.25rem] p-[2.5rem] bg-[#FFF] w-[40%] rounded-[0.1875rem]`}>
                    <div className={`flex flex-col gap-[0.5rem]`}>
                        <span className={`text-primary text-base full_hd:text-base_2xl`}>Informacija</span>
                        <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>Parinkite apačioje esančius laukelius..</span>
                    </div>
                    <div className={`flex gap-[1.25rem] flex-wrap`}>
                        {Object.keys(PostErrorTypes).map((keyIndex, idx) => (
                            <RenderButton index={Number(keyIndex)} isSelected={activeType === Number(keyIndex)} onSelect={HandleTypeChange} key={`error_types_main_${idx}`}>
                                {errors[PostErrorTypes[Number(keyIndex) as keyof typeof PostErrorTypes] as keyof typeof errors]}
                            </RenderButton>
                        ))}
                    </div>
                    <hr className={`w-full border-border`} />
                    {!isLoading && errorsByType && (
                        <div className={`flex gap-[1.25rem] flex-wrap`}>
                            {Object.keys(errorsByType).map((keyIndex, idx) => (
                                <RenderButton index={Number(keyIndex)} isSelected={activeErrorsByType.includes(Number(keyIndex))} onSelect={HandleErrorSelect} key={`error_types_secondary_${idx}`}>
                                    {errors[errorsByType[Number(keyIndex) as keyof typeof errorsByType] as keyof typeof errors]}
                                </RenderButton>
                            ))}
                        </div>
                    )}
                    <div className={`flex gap-[1.25rem]`}>
                        <button onClick={() => onSelect({ type: activeType, errors: activeErrorsByType })} className={`px-[0.62rem] py-[0.5rem] text-base full_hd:text-base_2xl rounded-[0.1875rem] bg-highlight text-[#FFF] hover:opacity-80 duration-300`}>
                            {dialog.accept}
                        </button>
                        <button onClick={() => setOpen(false)} className={`px-[0.62rem] py-[0.5rem] text-base full_hd:text-base_2xl rounded-[0.1875rem] border-border border-[1px] text-placeholder_secondary hover:opacity-80 duration-300`}>
                            {dialog.cancel}
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
}

const RenderButton = ({ children, onSelect, index, isSelected }: { children: React.ReactNode, onSelect: (value: number) => void, index: number, isSelected: boolean }) => {
    return (
        <button onClick={() => onSelect(Number(index))} className={`hover:opacity-80 duration-300 px-[0.62rem] py-[0.5rem] text-base full_hd:text-base_2xl rounded-[0.1875rem] ${isSelected ? `bg-error_secondary text-[#FFF]` : `bg-highlight_secondary text-placeholder`}`}>
            {children}
        </button>
    )
}