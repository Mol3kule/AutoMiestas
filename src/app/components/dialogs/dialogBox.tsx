'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/lib/languageUtils";

type DialogBoxProps = {
    isOpen: boolean;
    title: string;
    description: string;
    onSubmit: (status: boolean) => void;
    // setOpen: (isOpen: boolean) => void;
};

export const DialogBox = ({ isOpen, title, description, onSubmit }: DialogBoxProps) => {
    const t = useLanguage();

    const handleSubmit = () => {
        onSubmit(true);
    }

    const handleCancel = () => {
        onSubmit(false);
    }

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={`text-primary text-header full_hd:text-header_2xl`}>{title}</AlertDialogTitle>
                    <AlertDialogDescription className={`text-primary text-sm full_hd:text-sm_2xl`}>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel} className={`text-primary text-base full_hd:text-base_2xl`}>{t.dialog.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} className={`text-[#FFF] text-base full_hd:text-base_2xl`}>{t.dialog.accept}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}