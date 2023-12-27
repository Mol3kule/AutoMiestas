'use client';

import { FormEvent, use, useState } from "react";
import { LoginWithGoogleButton } from "../../buttons/loginWithGoogleButton";
import { CustomInput } from "../../inputs/CustomInput";
import { AuthWrapper } from "../../hooks/auth.hook";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RegisterVerifyCodePage } from "./registerVerify";

type LoginPageProps = {
    ChangeView: () => void;
}

export const RegisterPage = ({ ChangeView }: LoginPageProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const router = useRouter();
    const { signUp, setActive } = useSignUp();

    const [verificationActive, setVerificationActive] = useState(false);

    const HandleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (password !== passwordRepeat) {
            setErrorMessage('Slaptažodžiai nesutampa.');
            return;
        }

        signUp?.create({
            emailAddress,
            password,
            firstName,
            lastName
        }).then(async (result) => {
            if (result.status === "missing_requirements") {
                await result.prepareVerification({ strategy: 'email_code' })
                setVerificationActive(true);
            } else if (result.status === "complete") {
                setActive({ session: result.createdSessionId });

                // Insert a new registered user to prisma DB
                fetch(`${process.env.defaultApiEndpoint}/api/auth`, {
                    body: JSON.stringify({
                        type: 'createNew',
                        userId: result.createdUserId
                    })
                }).then(async (response) => {
                    const { status } = await response.json();
                    if (status === 'success') {
                        router.push('/');
                    }
                });
            }
        }).catch((err) => {
            switch (err.errors[0].code) {
                case "form_password_pwned": {
                    setErrorMessage('Šis slaptažodis yra pernelyg paprastas. Pabandykite naudoti sudėtingesnį.');
                    break;
                }
                case "form_identifier_exists": {
                    setErrorMessage('Toks el. pašto adresas jau yra užregistruotas.');
                    break;
                }
                case "form_password_length_too_short": {
                    setErrorMessage('Slaptažodis per trumpas. Jis turi būti bent 8 simbolių ilgio.');
                    break;
                }
                case "too_many_requests": {
                    setErrorMessage('Per daug užklausų. Pabandykite vėliau.');
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
            {verificationActive ? (
                <RegisterVerifyCodePage emailAddress={emailAddress} password={password} setErrorMessage={setErrorMessage} />
            ) : (
                <>
                    <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                        <span className={`font-medium text-[0.875rem]`}>Registracija</span>
                        <span className={`text-[0.75rem] text-center`}>Užpildykite visus reikalingus laukus, jog tęstumėte.</span>
                    </div>
                    <div className={`flex flex-col w-full gap-[1.37rem]`}>
                        <CustomInput type='email' name="emailAddress" placeholder={`El. pašto adresas`} value={emailAddress} setValue={setEmailAddress} isRequired={true} />
                        <CustomInput type='text' name="firstName" placeholder={`Vardas`} value={firstName} setValue={setFirstName} isRequired={true} />
                        <CustomInput type='text' name="lastName" placeholder={`Pavardė`} value={lastName} setValue={setLastName} isRequired={true} />
                        <CustomInput type='password' name="password" placeholder={`Slaptažodis`} value={password} setValue={setPassword} isRequired={true} />
                        <CustomInput type='password' name="password_repeat" placeholder={`Pakartokite slaptažodį`} value={passwordRepeat} setValue={setPasswordRepeat} isRequired={true} />
                        <button type="submit" className={`bg-primary rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}>Registruotis</button>
                        <span className={`text-[0.75rem] text-secondary`}>Jau turite paskyrą? <button type='button' className={`text-highlight`} onClick={ChangeView}>Prisijungti</button></span>
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
                </>
            )}
        </AuthWrapper>
    )
}