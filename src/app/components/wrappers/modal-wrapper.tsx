"use client";

import Modal from 'react-modal';
import { PageWrapper } from './page-wrapper';
import { useEffect } from 'react';

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
};

export const ModalWrapper = ({ children, isOpen, setOpen }: ModalProps) => {
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "auto";
            return;
        }
        document.body.style.overflow = "hidden";
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} className={`absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full flex justify-center items-center`}>
            <PageWrapper>
                {children}
            </PageWrapper>
        </Modal>
    );
};