'use client';

import { FormEvent, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth/auth.store";
import { AuthWrapper } from "@/app/components/wrappers/auth-wrapper";
import { CustomInput } from "@/app/components/inputs/CustomInput";
import { LoginWithGoogleButton } from "@/app/components/buttons/loginWithGoogleButton";
import { Spinner } from "@/app/components/spinner";
import { ViewTypes } from "./AuthWrap";

type LoginPageProps = {
    ChangeView: (type: ViewTypes) => void;
}

export const LoginPage = ({ ChangeView }: LoginPageProps) => {
    const { email, password, setEmail, setPassword } = useAuthStore();
    const { signIn, setActive, isLoaded } = useSignIn();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

    if (!isLoaded) return <Spinner />

    const HandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        signIn?.create({
            identifier: email,
            password,
        }).then((result) => {
            if (result.status === "complete") {
                setActive({ session: result.createdSessionId });
                setIsLoading(false);
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
            setIsLoading(false);
        });
    }

    return (
        <AuthWrapper HandleFormSubmit={HandleSubmit}>
            <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                <span className={`font-medium text-header full_hd:text-header_2xl`}>Prisijungti</span>
                <span className={`text-base full_hd:text-base_2xl text-center`}>Prisijunkite arba susikurkite naują paskyrą. <button type='button' className={`text-highlight`} onClick={() => ChangeView('register')}>Registruotis</button></span>
            </div>
            <div className={`flex flex-col w-full gap-[1.37rem]`}>
                <CustomInput
                    type={`email`}
                    name={`emailAddress`}
                    placeholder={`El. pašto adresas`}
                    value={email ?? ''}
                    setValue={setEmail}
                    isRequired={true}
                />
                <CustomInput
                    type={`password`}
                    name={`password`}
                    placeholder={`Slaptažodis`}
                    value={password ?? ''}
                    setValue={setPassword}
                    isRequired={true}
                />
                <button type="submit" className={`bg-primary rounded-[0.1875rem] py-[0.88rem] text-[#FFF] text-base full_hd:text-base_2xl`}>
                    {!isLoading ? `Prisijungti` : <Spinner />}
                </button>
                <span className={`text-base full_hd:text-base_2xl text-secondary`}>Pamiršote slaptažodį? <button type='button' className={`text-highlight`} onClick={() => ChangeView('password_reset')}>Atkurti</button></span>
            </div>

            <div className={`flex items-center w-full`}>
                <hr className={`w-full text-border bg-border`} />
                <span className={`text-border px-[1.25rem] text-base full_hd:text-base_2xl`}>Arba</span>
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