"use client";

import Modal from 'react-modal';
import { TProduct } from "@/app/api/stripe/getProducts/route";
import { getProducts } from "@/lib/stripeActions";
import { Moon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModalWrapper } from '@/app/components/wrappers/modal-wrapper';

type RenderProductsProps = {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    onSelect: (priceId: string) => void;
};

export const ProductsModal = ({ isOpen, setOpen, onSelect }: RenderProductsProps) => {
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res);
        });
    }, []);

    const HandleSubscription = (priceId: string) => {
        onSelect(priceId);
        setOpen(false);
    };

    const RenderItem = ({ item }: { item: TProduct }) => {
        return (
            <div className={`flex flex-col rounded-[0.1875rem] px-[2.19rem] py-[1.87rem] gap-[0.88rem] bg-highlight_secondary w-[35rem]`}>
                <div className={`flex gap-[1.25rem] items-center`}>
                    <div className={`flex items-center justify-center rounded-[0.375rem] p-[0.5rem] bg-[#FFF]`}>
                        <Moon className={`text-highlight w-[1.125rem] h-[1.125rem]`} />
                    </div>
                    <span className={`text-primary text-base full_hd:text-base_2xl font-medium uppercase`}>{item.name} - {(item.unit_amount / 100).toLocaleString('lt-LT')}&euro;</span>
                </div>
                <hr className={`text-border bg-border`} />
                <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>
                    Planas automobilių skelbimų puslapiui yra puikus pradžios taškas tiems, kurie nori surasti klientus internete. Pagrindines funkcijos, leidžiančios išskleisti svarbiausią informaciją apie automobilį, pritraukti dėmesį potencialių pirkėjų bei lengvai valdyti savo skelbimus.
                </span>
                <button onClick={() => HandleSubscription(item.id)} className={`text-base full_hd:text-base_2xl mt-[2.5rem] py-[0.75rem] rounded-[0.1875rem] bg-primary text-[#FFF]`}>Įsigyti prenumeratą</button>
            </div>
        );
    }

    return (
        <ModalWrapper isOpen={isOpen} setOpen={setOpen}>
            <X className={`absolute top-[1rem] right-[1rem] w-[2rem] h-[2rem] text-highlight_secondary hover:cursor-pointer`} onClick={() => setOpen(false)} />
            <div className={`flex flex-col laptop:flex-row gap-[1.25rem] items-center justify-center`}>
                {products?.map((item, idx) => (
                    <RenderItem item={item} key={`product_item_${idx}`} />
                ))}
            </div>
        </ModalWrapper>
    );
};