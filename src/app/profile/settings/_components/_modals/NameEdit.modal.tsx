"use client";

import { useState } from "react";

import { useLanguage } from "@/lib/languageUtils";
import { EditWrapperModal } from "./EditWrapper.modal";
import { Label } from "@/shadcn-components/ui/label";
import { Input } from "@/shadcn-components/ui/input";
import toast from "react-hot-toast";
import { updateUserName } from "@/actions/users/user.actions";

type NameEditModalProps = {
    isOpen: boolean;
    data: NameEditModelData;
    onSubmit?: (status: boolean) => void;
    setOpen: (status: boolean) => void;
};

type NameEditModelData = {
    first_name: string | null;
    last_name: string | null;
};

export const NameEditModal = ({ isOpen, data, setOpen }: NameEditModalProps) => {
    const { first_name, last_name } = data;

    const [firstName, setFirstName] = useState(first_name ?? '');
    const [lastName, setLastName] = useState(last_name ?? '');

    const t = useLanguage();

    const HandleSubmit = async () => {
        if (firstName?.length <= 0 || lastName?.length <= 0) {
            toast.error(`Vardas ir/ar pavardė negali būti tušti`, { duration: 5000 });
            return;
        }

        if (firstName === first_name && lastName === last_name) {
            toast.error(t.profile.edit_name_not_changed, { duration: 5000 });
            return;
        }

        const { status } = await updateUserName(firstName, lastName);

        if (status === 200) {
            location.reload();
        }
    };

    return (
        <EditWrapperModal isOpen={isOpen} title={t.profile.edit_name_title} description={t.profile.edit_name_description} setOpen={setOpen} onSubmit={HandleSubmit}>
            <div className={`flex flex-col gap-[1.25rem]`}>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label className={`text-primary text-sm full_hd:text-sm_2xl`}>{t.profile.first_name}</Label>
                    <Input
                        defaultValue={firstName ?? ''}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
                <div className={`flex flex-col gap-[0.2rem]`}>
                    <Label className={`text-primary text-sm full_hd:text-sm_2xl`}>{t.profile.last_name}</Label>
                    <Input
                        defaultValue={lastName ?? ''}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full text-primary text-base full_hd:text-base_2xl`}
                    />
                </div>
            </div>
        </EditWrapperModal>
    );
};