"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

const ModalWrap = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`absolute flex flex-col items-center justify-center bg-[rgba(0,0,0,0.5)] w-full h-full top-0 left-0`}>
            {children}
        </div>
    );
};

export const EditProfileEmail = ({ currentEmail }: { currentEmail: string }) => {
    const [newEmail, setNewEmail] = useState('');

    const { signIn } = useSignIn();

    const requestEmailChange = async () => {
        
    }

    return (
        <ModalWrap>
            <div className={`flex flex-col gap-[1.25rem] px-[2.8rem] py-[1.5rem] bg-[#FFF] rounded-[0.1875rem]`}>
                <div className={`flex flex-col gap-[0.5rem]`}>
                    <span className={`text-primary text-header font-bold`}>El. pašto keitimas</span>
                    <span className={`text-primary text-base full_hd:text-base_2xl`}>Įveskite naują el. paštą.</span>
                </div>
                <input
                    type={`email`}
                    className={`w-full bg-highlight_secondary px-[1.25rem] py-[0.88rem] rounded-[0.1875rem] text-base full_hd:text-base_2xl focus:outline-none`}
                    placeholder="Naujas el. paštas"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <button type="button" className={`px-[1.25rem] py-[0.88rem] rounded-[0.1875rem] text-base full_hd:text-base_2xl bg-primary text-[#FFF]`}>Patvirtinti</button>
            </div>
        </ModalWrap>
    );
};