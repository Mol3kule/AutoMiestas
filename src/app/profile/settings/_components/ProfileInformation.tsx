"use client";

import { useLanguage } from "@/lib/languageUtils";
import { UserType } from "@/types/user.type";
import { useState } from "react";
import { EditProfileEmail } from "./ProfileEditComponents";

export const ProfileInformation = ({ userData }: { userData: UserType }) => {
    const t = useLanguage();

    const [isEditingEmail, setEditingEmail] = useState(false);

    const { first_name, last_name, phone_number, email } = userData;

    const ItemWrapper = ({ children }: { children: React.ReactNode }) => (
        <span className={`w-full rounded-[0.1875rem] px-[1.56rem] py-[0.87rem] bg-highlight_secondary`}>{children}</span>
    );

    const EditContent = ({ text, handleClick }: { text: string, handleClick: () => void }) => (
        <button type="button" onClick={handleClick} className={`px-[2.13rem] py-[0.88rem] text-base full_hd:text-base_2xl text-[#FFF] bg-primary rounded-[0.1875rem]`}>{text}</button>
    );

    const HandleEditEmail = () => {
        // setEditingEmail(true);
    };

    return (
        <div className={`flex flex-col gap-[1.25rem]`}>
            <div className={`flex flex-col gap-[0.88rem]`}>
                <span className={`text-primary text-base full_hd:text-base_2xl`}>{t.profile.header_title}</span>
                <span className={`text-placeholder_secondary text-base full_hd:text-base_2xl`}>{t.profile.header_desc}</span>
            </div>
            <div className={`grid grid-cols-1 laptop:grid-cols-2 gap-x-[4.38rem] gap-y-[1.25rem]`}>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.email}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{email}</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={() => setEditingEmail(true)} />
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.phone}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{phone_number}</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={HandleEditEmail} />
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.first_name}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{first_name}</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={HandleEditEmail} />
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.last_name}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{last_name}</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={HandleEditEmail} />
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.password}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>*********</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={HandleEditEmail} />
                    </div>
                </div>
            </div>
            {isEditingEmail && (
                <EditProfileEmail currentEmail={email} />
            )}
        </div>
    );
}