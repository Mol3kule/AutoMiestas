'use client';

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CooldownButton } from "../../buttons/cooldownButton";
import { CustomInput } from "../../inputs/CustomInput";

export const PasswordResetVerifyPage = ({ emailAddress, setErrorMessage }: { emailAddress: string, setErrorMessage: (errorMsg: string) => void }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const { signIn, setActive } = useSignIn();
    const router = useRouter();

    const attemptEmailVerification = async () => {
        if (password !== passwordRepeat) {
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
            identifier: emailAddress
        }).catch((error) => {
            switch (error.errors[0].code) {
                case "form_password_length_too_short": {
                    setErrorMessage('Slaptažodis per trumpas. Jis turi būti sudarytas bent iš 8 simbolių.');
                    break;
                }
                default: {
                    console.log(error.errors[0]);
                    break;
                }
            }
        });
    }

    return (
        <>
            <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                <span className={`font-medium text-[0.875rem]`}>Registracija</span>
                <span className={`text-[0.75rem] text-center`}>Į nurodytą el. paštą buvo išsiųstas patvirtinimo kodas.</span>
            </div>
            <CustomInput type='text' name="verify_code" placeholder={`Patvirtinimo kodas`} value={verificationCode} setValue={setVerificationCode} isRequired={true} />
            <CustomInput type='password' name="reset_password" placeholder={`Naujas slaptažodis`} value={password} setValue={setPassword} isRequired={true} />
            <CustomInput type='password' name="reset_password_repeat" placeholder={`Pakartokite slaptažodį`} value={passwordRepeat} setValue={setPasswordRepeat} isRequired={true} />
            <span className={`w-full text-base text-secondary text-right`}>Negavote kodo? <CooldownButton type='button' cooldownByDefault={true} cooldown={30000} text={`Siųsti dar kartą`} className={`text-highlight`} buttonClicked={handleResendVerificationCode} /></span>
            <button
                type="button"
                className={`bg-primary w-full rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}
                onClick={attemptEmailVerification}
            >Patvirtinti</button>
        </>
    )
}