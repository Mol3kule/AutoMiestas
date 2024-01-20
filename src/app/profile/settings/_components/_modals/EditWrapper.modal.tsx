"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/lib/languageUtils";

type EditWrapperModalProps = {
    isOpen: boolean;
    title: string;
    description: string;
    children: React.ReactNode;
    onSubmit?: (status: boolean) => void;
    setOpen: (status: boolean) => void;
};

export const EditWrapperModal = ({ isOpen, title, description, children, onSubmit, setOpen }: EditWrapperModalProps) => {
    const t = useLanguage();

    const HandleSubmit = () => {
        onSubmit && onSubmit(true);
        setOpen(false);
    }
    
    return (
        <Dialog open={isOpen} onOpenChange={(status) => setOpen(status)}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={`text-header full_hd:text-header_2xl text-primary`}>{title}</DialogTitle>
                    <DialogDescription className={`text-base full_hd:text-base_2xl text-primary`}>{description}</DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button type="submit" onClick={HandleSubmit} className={`text-[#FFF] text-base full_hd:text-base_2xl`}>{t.dialog.accept}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}