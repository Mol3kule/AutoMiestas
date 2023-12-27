'use client';

import { FormEvent, Suspense, useState } from "react";
import { CustomInput } from "../../inputs/CustomInput";
import { AuthWrapper } from "../../hooks/auth.hook";
import { useSignIn } from "@clerk/nextjs";
import { PasswordResetVerifyPage } from "./passwordResetVerify";
import { Spinner } from "../../spinner";

type PasswordResetPageProps = {
    ChangeView: () => void;
}

export const PasswordResetPage = ({ ChangeView }: PasswordResetPageProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [verificationActive, setVerificationActive] = useState(false);
    const { signIn } = useSignIn();

    const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);

    const HandleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingInProgress(true);
        signIn?.create({
            strategy: 'reset_password_email_code',
            identifier: emailAddress
        }).then(() => {
            setVerificationActive(true); // Show verification code view
            setIsLoadingInProgress(false);
        }).catch((error) => {
            switch (error.errors[0].code) {
                default: {
                    console.log(error.errors[0]);
                    break;
                }
            }
        });
    }

    return (
        <AuthWrapper HandleFormSubmit={HandleFormSubmit}>
            {verificationActive ? (
                <PasswordResetVerifyPage emailAddress={emailAddress} setErrorMessage={setErrorMessage} />
            ) : (
                <>
                    <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                        <span className={`font-medium text-[0.875rem]`}>Slaptažodžio atkūrimas</span>
                        <span className={`text-[0.75rem] text-center`}>Įveskite el. paštą arba sugrįžkite į <button type='button' className={`text-highlight`} onClick={ChangeView}>prisijungimo puslapį</button>, kad atšauktumėte atkūrimo procesą.</span>
                    </div>
                    <div className={`flex flex-col w-full gap-[1.37rem]`}>
                        <CustomInput type='email' name="email" placeholder={`El. pašto adresas`} value={emailAddress} setValue={setEmailAddress} isRequired={true} />
                        <button
                            type="submit"
                            className={`flex items-center justify-center gap-[0.5rem] bg-primary rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}
                        >Siųsti patvirtinimo kodą {isLoadingInProgress && <Spinner />}</button>
                    </div>
                </>
            )}
            <Suspense fallback={<Spinner />}>
                <div className={`flex items-center w-full bg-error py-[0.85rem] ${errorMessage ? 'block' : 'hidden'}`}>
                    <span className={`w-full text-center text-primary text-base px-[1.55rem]`}>{errorMessage}</span>
                </div>
            </Suspense>
        </AuthWrapper>
    )
}