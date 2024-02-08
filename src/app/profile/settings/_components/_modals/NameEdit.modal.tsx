"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/lib/languageUtils";
import { EditWrapperModal } from "./EditWrapper.modal";
import { Label } from "@/shadcn-components/ui/label";
import { Input } from "@/shadcn-components/ui/input";
import toast from "react-hot-toast";

type NameEditModalProps = {
    isOpen: boolean;
    data: NameEditModelData;
    onSubmit?: (status: boolean) => void;
    setOpen: (status: boolean) => void;
};

type NameEditModelData = {
    first_name: string;
    last_name: string;
};

export const NameEditModal = ({ isOpen, data, setOpen }: NameEditModalProps) => {
    const t = useLanguage();

    const { first_name, last_name } = data;

    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);

    const router = useRouter();

    const HandleSubmit = async () => {
        if (firstName === first_name && lastName === last_name) {
            toast.error(t.profile.edit_name_not_changed, { duration: 5000 });
            return;
        }
        const changeNameResponse = axios.post(`${process.env.defaultApiEndpoint}/api/auth/updateProfile/setName`, { firstName, lastName }).then((res) => res.data);

        const { status } = await changeNameResponse;
        if (status !== 200) {
            toast.error(t.general.server_error, { duration: 5000 });
            return;
        }

        await toast.promise(changeNameResponse, {
            loading: t.general.action_in_progress,
            success: t.profile.edit_name_success,
            error: t.general.server_error
        }, { duration: 5000 });
        
        location.reload();
    };

    return (
        <EditWrapperModal isOpen={isOpen} title={t.profile.edit_name_title} description={t.profile.edit_name_description} setOpen={setOpen} onSubmit={HandleSubmit}>
            <div className={`flex flex-col gap-[1.25rem]`}>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label htmlFor="name" className={`text-primary text-sm full_hd:text-sm_2xl`}>{t.profile.first_name}</Label>
                    <Input
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label htmlFor="username" className={`text-primary text-sm full_hd:text-sm_2xl`}>{t.profile.last_name}</Label>
                    <Input
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
            </div>
        </EditWrapperModal>
    );
};