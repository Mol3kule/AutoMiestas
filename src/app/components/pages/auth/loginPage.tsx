'use client';

import { FormEvent, useState } from "react";
import { LoginWithGoogleButton } from "../../buttons/loginWithGoogleButton";
import { CustomInput } from "../../inputs/CustomInput";
import { AuthWrapper } from "../../hooks/auth.hook";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "../../spinner";

type LoginPageProps = {
    ChangeView: () => void;
    ResetPassword: () => void;
}

export const LoginPage = ({ ChangeView, ResetPassword }: LoginPageProps) => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    if (!isLoaded) return <Spinner />

    const HandleSubmit = (e: FormEvent) => {
        e.preventDefault();

        signIn?.create({
            identifier: emailAddress,
            password,
        }).then((result) => {
            if (result.status === "complete") {
                setActive({ session: result.createdSessionId });
                router.push('/');
            }
        }).catch((err) => {
            switch (err.errors[0].code) {
                case "form_identifier_not_found": {
                    setErrorMessage('Neteisingas el. pašto adresas arba slaptažodis. Dar kartą patikrinkite ir bandykite iš naujo.');
                    break;
                }
                case "form_password_incorrect": {
                    setErrorMessage('Neteisingas el. pašto adresas arba slaptažodis. Dar kartą patikrinkite ir bandykite iš naujo.');
                    break;
                }
                default: {
                    console.log(err.errors[0]);
                    setErrorMessage(err.errors[0].longMessage)
                    break;
                }
            }
        });
    }

    return (
        <AuthWrapper HandleFormSubmit={HandleSubmit}>
            <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                <span className={`font-medium text-[0.875rem]`}>Prisijungti</span>
                <span className={`text-[0.75rem] text-center`}>Prisijunkite arba susikurkite naują paskyrą. <button type='button' className={`text-highlight`} onClick={ChangeView}>Registruotis</button></span>
            </div>
            <div className={`flex flex-col w-full gap-[1.37rem]`}>
                <CustomInput
                    type={`email`}
                    name={`emailAddress`}
                    placeholder={`El. pašto adresas`}
                    value={emailAddress}
                    setValue={setEmailAddress}
                    isRequired={true}
                />
                <CustomInput
                    type={`password`}
                    name={`password`}
                    placeholder={`Slaptažodis`}
                    value={password}
                    setValue={setPassword}
                    isRequired={true}
                />
                <button type="submit" className={`bg-primary rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}>Prisijungti</button>
                <span className={`text-[0.75rem] text-secondary`}>Pamiršote slaptažodį? <button type='button' className={`text-highlight`} onClick={ResetPassword}>Atkurti</button></span>
            </div>

            <div className={`flex items-center w-full`}>
                <hr className={`w-full text-border bg-border`} />
                <span className={`text-border px-[1.25rem] text-[0.75rem]`}>Arba</span>
                <hr className={`w-full text-border bg-border`} />
            </div>

            <div className={`w-full`}>
                <LoginWithGoogleButton />
            </div>

            <div className={`flex items-center w-full bg-error py-[0.85rem] ${errorMessage ? 'block' : 'hidden'}`}>
                <span className={`w-full text-center text-primary text-base px-[1.55rem]`}>{errorMessage}</span>
            </div>
        </AuthWrapper>
    )
}