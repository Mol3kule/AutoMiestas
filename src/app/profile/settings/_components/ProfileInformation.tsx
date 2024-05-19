"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/users/user.actions";
import { useLanguage } from "@/lib/languageUtils";

import { NameEditModal } from "./_modals/NameEdit.modal";
import { PasswordEditModal } from "./_modals/password-edit";

export const ProfileInformation = ({ setError }: { setError: (data: string) => void }) => {
    const t = useLanguage();

    const [isEditingName, setEditingName] = useState(false);
    const [isEditingPassword, setEditingPassword] = useState(false);

    const { isLoading, data: userData } = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => {
            const userData = await getUser();
            if (!userData) return null;

            if (!userData.phone_number) {
                setError(t.profile.phone_required);
            }
            return userData;
        },
        staleTime: Infinity
    })

    const ItemWrapper = ({ children }: { children: React.ReactNode }) => (
        <span className={`w-full rounded-[0.1875rem] px-[1.56rem] py-[0.87rem] bg-highlight_secondary`}>{children}</span>
    );

    const EditContent = ({ text, handleClick }: { text: string, handleClick: () => void }) => (
        <button type="button" onClick={handleClick} className={`px-[2.13rem] py-[0.88rem] text-base full_hd:text-base_2xl text-[#FFF] bg-primary rounded-[0.1875rem]`}>{text}</button>
    );


    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.88rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.profile.header_title}</span>
                <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>{t.profile.header_desc}</span>
            </div>
            {userData && (
                <div className={`grid grid-cols-1 laptop:grid-cols-2 gap-x-[4.38rem] gap-y-[1.25rem]`}>
                    <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                        <span>{t.profile.email}</span>
                        <div className={`flex gap-[1.25rem]`}>
                            <ItemWrapper>{userData.email}</ItemWrapper>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                        <span>{t.profile.phone}</span>
                        <div className={`flex gap-[1.25rem]`}>
                            <ItemWrapper>{userData.phone_number}</ItemWrapper>
                        </div>
                    </div>
                    <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                        <span>{t.profile.first_name}</span>
                        <div className={`flex gap-[1.25rem]`}>
                            <ItemWrapper>{userData.first_name} {userData.last_name}</ItemWrapper>
                            <EditContent text={t.general.edit} handleClick={() => setEditingName(true)} />
                        </div>
                    </div>
                    <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                        <span>{t.profile.password}</span>
                        <div className={`flex gap-[1.25rem]`}>
                            <ItemWrapper>*********</ItemWrapper>
                            <EditContent text={t.general.edit} handleClick={() => setEditingPassword(true)} />
                        </div>
                    </div>
                </div>
            )}

            {isEditingName && (
                <NameEditModal isOpen={isEditingName} setOpen={setEditingName} data={{ first_name: userData?.first_name ?? '', last_name: userData?.last_name ?? '' }} />
            )}

            {isEditingPassword && (
                <PasswordEditModal isOpen={isEditingPassword} setOpen={setEditingPassword} />
            )}
        </div>
    );
}