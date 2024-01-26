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
import { useEffect, useState } from "react";

type DialogBoxProps = {
    isOpen: boolean;
    title: string;
    description: string;
    onSubmit: (status: boolean) => void;
    // setOpen: (isOpen: boolean) => void;
};


const defaultSeconds = 8;
export const DialogBox = ({ isOpen, title, description, onSubmit }: DialogBoxProps) => {
    const t = useLanguage();
    const [seconds, setSeconds] = useState(defaultSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [seconds]);

    useEffect(() => {
        if (!isOpen) return;
        setSeconds(defaultSeconds);
    }, [isOpen]);

    const handleSubmit = () => {
        onSubmit(true);
    }

    const handleCancel = () => {
        onSubmit(false);
    }

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent className={`bg-highlight_secondary border-none rounded-[0.1875rem]`}>
                <AlertDialogHeader>
                    <AlertDialogTitle className={`text-primary text-header full_hd:text-header_2xl`}>{title}</AlertDialogTitle>
                    <AlertDialogDescription className={`text-primary text-sm full_hd:text-sm_2xl`}>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel} className={`text-primary text-base full_hd:text-base_2xl`}>{t.dialog.cancel}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit} className={`text-[#FFF] text-base full_hd:text-base_2xl`} disabled={seconds > 0}>{t.dialog.accept} {seconds > 0 ? `(${seconds})` : ``}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}