"use client";

import { useLanguage } from "@/lib/languageUtils";
import { UserType } from "@/types/user.type";
import { useState } from "react";
import { NameEditModal } from "./_modals/NameEdit.modal";
import { DialogBox } from "@/components/dialogs/dialogBox";

export const ProfileInformation = ({ userData }: { userData: UserType }) => {
    const t = useLanguage();

    const [isEditingEmail, setEditingEmail] = useState(false);
    const [isEditingPhone, setEditingPhone] = useState(false);
    const [isEditingName, setEditingName] = useState(false);
    const [isEditingPassword, setEditingPassword] = useState(false);

    const [editingEmailDialog, setEditingEmailDialog] = useState(false);
    const [editingPhoneDialog, setEditingPhoneDialog] = useState(false);
    const [editingNameDialog, setEditingNameDialog] = useState(false);
    const [editingPasswordDialog, setEditingPasswordDialog] = useState(false);

    const { first_name, last_name, phone_number, email } = userData;

    const ItemWrapper = ({ children }: { children: React.ReactNode }) => (
        <span className={`w-full rounded-[0.1875rem] px-[1.56rem] py-[0.87rem] bg-highlight_secondary`}>{children}</span>
    );

    const EditContent = ({ text, handleClick }: { text: string, handleClick: () => void }) => (
        <button type="button" onClick={handleClick} className={`px-[2.13rem] py-[0.88rem] text-base full_hd:text-base_2xl text-[#FFF] bg-primary rounded-[0.1875rem]`}>{text}</button>
    );

    const HandleEmailEditDialogResponse = (status: boolean) => {
        setEditingEmailDialog(false);
        status ? setEditingEmail(true) : setEditingEmail(false);
    };

    const HandlePhoneEditDialogResponse = (status: boolean) => {
        setEditingPhoneDialog(false);
        status ? setEditingPhone(true) : setEditingPhone(false);
    };

    const HandleNameEditDialogResponse = (status: boolean) => {
        setEditingNameDialog(false);
        status ? setEditingName(true) : setEditingName(false);
    };

    const HandlePasswordEditDialogResponse = (status: boolean) => {
        setEditingPasswordDialog(false);
        status ? setEditingPassword(true) : setEditingPassword(false);
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
                        {/* <EditContent text={t.general.edit} handleClick={() => setEditingEmail(true)} /> */}
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.phone}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{phone_number}</ItemWrapper>
                        {/* <EditContent text={t.general.edit} handleClick={HandleEditEmail} /> */}
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.first_name}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>{first_name} {last_name}</ItemWrapper>
                        <EditContent text={t.general.edit} handleClick={() => setEditingNameDialog(true)} />
                    </div>
                </div>
                <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                    <span>{t.profile.password}</span>
                    <div className={`flex gap-[1.25rem]`}>
                        <ItemWrapper>*********</ItemWrapper>
                        {/* <EditContent text={t.general.edit} handleClick={HandleEditEmail} /> */}
                    </div>
                </div>
            </div>

            {isEditingName && (
                <NameEditModal isOpen={isEditingName} setOpen={setEditingName} data={{ first_name, last_name }}/>
            )}

            {editingEmailDialog && (
                <DialogBox isOpen={editingEmailDialog} title={t.profile.dialog_change_email_title} description={t.dialog.edit_description} onSubmit={HandleEmailEditDialogResponse} />
            )}

            {editingPhoneDialog && (
                <DialogBox isOpen={editingPhoneDialog} title={t.profile.dialog_change_phone_title} description={t.dialog.edit_description} onSubmit={HandlePhoneEditDialogResponse} />
            )}

            {editingNameDialog && (
                <DialogBox isOpen={editingNameDialog} title={t.profile.dialog_change_name_title} description={t.dialog.edit_description} onSubmit={HandleNameEditDialogResponse} />
            )}

            {editingPasswordDialog && (
                <DialogBox isOpen={editingPasswordDialog} title={t.profile.dialog_change_name_title} description={t.dialog.edit_description} onSubmit={HandlePasswordEditDialogResponse} />
            )}
        </div>
    );
}