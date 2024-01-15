'use client';

import { FormEvent, Suspense, useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { AuthWrapper } from "@/app/components/hooks/auth.hook";
import { Spinner } from "@/app/components/spinner";
import { CustomInput } from "@/app/components/inputs/CustomInput";
import { ViewTypes } from "./AuthWrap";
import { useAuthStore } from "@/store/auth/auth.store";
import { CooldownButton } from "@/app/components/buttons/cooldownButton";
import { useRouter } from "next/navigation";

type PasswordResetPageProps = {
    ChangeView: (type: ViewTypes) => void;
}

export const PasswordResetPage = ({ ChangeView }: PasswordResetPageProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [verificationActive, setVerificationActive] = useState(false);

    const { email, verificationCode, password, password_repeat, setVerificationCode, setPassword, setPasswordRepeat, setEmail } = useAuthStore();
    const { signIn, setActive } = useSignIn();

    const router = useRouter();

    const [isLoadingInProgress, setIsLoadingInProgress] = useState(false);

    const HandleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoadingInProgress(true);
        signIn?.create({
            strategy: 'reset_password_email_code',
            identifier: email
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

    const attemptEmailVerification = async () => {
        if (password !== password_repeat) {
            setErrorMessage('Slaptažodžiai nesutampa.');
            return;
        }

        await signIn?.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code: verificationCode,
            password
        }).then((result) => {
            if (result.status === 'complete') {
                setActive({ session: result.createdSessionId });
                router.push('/')
            }
        }).catch((error) => {
            switch (error.errors[0].code) {
                case "form_param_nil": {
                    setErrorMessage('Prašome užpildyti visus laukus.');
                    break;
                }
                case "form_code_incorrect": {
                    setErrorMessage('Patvirtinimo kodas yra neteisingas.');
                    break;
                }
                default: {
                    console.log(error.errors[0]);
                    break;
                }
            }
        })
    }
    const handleResendVerificationCode = async () => {
        setVerificationCode(''); // Clear input

        signIn?.create({
            strategy: 'reset_password_email_code',
            identifier: email
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
                <>
                    <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                        <span className={`font-medium text-header_2xl`}>Registracija</span>
                        <span className={`text-base full_hd:text-base_2xl text-center`}>Į nurodytą el. paštą buvo išsiųstas patvirtinimo kodas.</span>
                    </div>
                    <CustomInput type='text' name="verify_code" placeholder={`Patvirtinimo kodas`} value={verificationCode} setValue={setVerificationCode} isRequired={true} />
                    <CustomInput type='password' name="reset_password" placeholder={`Naujas slaptažodis`} value={password} setValue={setPassword} isRequired={true} />
                    <CustomInput type='password' name="reset_password_repeat" placeholder={`Pakartokite slaptažodį`} value={password_repeat} setValue={setPasswordRepeat} isRequired={true} />
                    <span className={`w-full text-base full_hd:text-base_2xl text-secondary text-right`}>Negavote kodo? <CooldownButton type='button' cooldownByDefault={true} cooldown={30000} text={`Siųsti dar kartą`} className={`text-highlight`} buttonClicked={handleResendVerificationCode} /></span>
                    <button
                        type="button"
                        className={`bg-primary w-full rounded-[0.1875rem] py-[0.88rem] text-[#FFF] text-base full_hd:text-base_2xl`}
                        onClick={attemptEmailVerification}
                    >Patvirtinti</button>
                </>
            ) : (
                <>
                    <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                        <span className={`font-medium text-header_2xl`}>Slaptažodžio atkūrimas</span>
                        <span className={`text-base full_hd:text-base_2xl text-center`}>Įveskite el. paštą arba sugrįžkite į <button type='button' className={`text-highlight`} onClick={() => ChangeView('login')}>prisijungimo puslapį</button>, kad atšauktumėte atkūrimo procesą.</span>
                    </div>
                    <div className={`flex flex-col w-full gap-[1.37rem]`}>
                        <CustomInput type='email' placeholder={`El. pašto adresas`} value={email} setValue={setEmail} isRequired={true} />
                        <button
                            type="submit"
                            className={`flex items-center justify-center gap-[0.5rem] bg-primary rounded-[0.1875rem] py-[0.88rem] text-[#FFF] text-base full_hd:text-base_2xl`}
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