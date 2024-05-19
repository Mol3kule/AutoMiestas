"use client";

import { Button } from "@/shadcn-components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shadcn-components/ui/dialog";
import { useLanguage } from "@/lib/languageUtils";

type EditWrapperModalProps = {
    isOpen: boolean;
    title: string;
    description: string;
    children: React.ReactNode;
    closeOnSubmit?: boolean;
    onSubmit: () => void;
    setOpen: (status: boolean) => void;
};

export const EditWrapperModal = ({ isOpen, title, description, children, onSubmit, setOpen, closeOnSubmit = true }: EditWrapperModalProps) => {
    const t = useLanguage();

    const HandleSubmit = () => {
        closeOnSubmit ? setOpen(false) : setOpen(true);
        onSubmit();
    }

    return (
        <Dialog open={isOpen} onOpenChange={(status) => setOpen(status)}>
            <DialogContent className="sm:max-w-[425px] bg-[#FFF]">
                <DialogHeader>
                    <DialogTitle className={`text-header full_hd:text-header_2xl text-primary`}>{title}</DialogTitle>
                    <DialogDescription className={`text-base full_hd:text-base_2xl text-primary`}>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button type="button" onClick={HandleSubmit} className={`text-[#FFF] text-base full_hd:text-base_2xl bg-primary`}>{t.dialog.accept}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}