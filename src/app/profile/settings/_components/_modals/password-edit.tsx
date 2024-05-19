"use client";

import { z } from "zod";
import { useState } from "react";
import { useAuth, useSignIn, useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/shadcn-components/ui/label";
import { Input } from "@/shadcn-components/ui/input";
import { Spinner } from "@/components/spinner";
import { EditWrapperModal } from "./EditWrapper.modal";
import toast from "react-hot-toast";

type PageProps = {
    isOpen: boolean;
    onSubmit?: (status: boolean) => void;
    setOpen: (status: boolean) => void;
};

const formValidationSchema = z.object({
    currentPassword: z.string().min(3).max(10),
    password: z.string().min(5)
});

export const PasswordEditModal = ({ isOpen, setOpen }: PageProps) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');

    const { user } = useUser();
    const { isLoaded, signIn, setActive } = useSignIn();
    const { signOut } = useAuth();

    if (!user || !isLoaded) return null;

    const HandleSubmit = async () => {
        try {
            formValidationSchema.parse({
                currentPassword: currentPassword,
                password: password
            });

            try {
                toast.success(`Slaptažodis sėkmingai pakeistas.`, { duration: 5000 });
            } catch (error: any) {
                switch (error.errors[0].code) {
                    case "form_param_nil": {
                        toast.error(`Prašome užpildyti visus laukus.`, { duration: 5000 });
                        break;
                    }
                    case "form_code_incorrect": {
                        toast.error(`Patvirtinimo kodas yra neteisingas.`, { duration: 5000 });
                        break;
                    }
                    default: {
                        toast.error(`${error.errors[0].longMessage}`);
                        console.log(error.errors[0]);
                        break;
                    }
                }
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const { code, path } = error.errors[0];
                switch (path[0]) {
                    case 'code': {
                        if (code === 'too_small') {
                            toast.error(`Patvirtinimo kodas per trumpas`, { duration: 5000 });
                        } else if (code === 'too_big') {
                            toast.error(`Patvirtinimo kodas per ilgas`, { duration: 5000 });
                        }
                        break;
                    }
                    case 'password': {
                        if (code === 'too_small') {
                            toast.error(`Slaptažodis per trumpas`, { duration: 5000 });
                        }
                        break;
                    }
                }
            }
        }
    };

    return (
        <EditWrapperModal isOpen={isOpen} title={`Slaptažodžio keitimas`} description={``} setOpen={setOpen} onSubmit={HandleSubmit} closeOnSubmit={false}>
            <div className={`flex flex-col gap-[1.25rem]`}>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label className={`text-primary text-sm full_hd:text-sm_2xl`}>{`Dabartinis slaptažodis)`}</Label>
                    <Input
                        type="password"
                        defaultValue={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label className={`text-primary text-sm full_hd:text-sm_2xl`}>{`Naujas slaptažodis`}</Label>
                    <Input
                        type="password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
            </div>
        </EditWrapperModal>
    );
};