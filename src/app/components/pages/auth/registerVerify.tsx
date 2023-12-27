'use client';

import { useState } from "react";
import { CooldownButton } from "../../buttons/cooldownButton";
import { CustomInput } from "../../inputs/CustomInput";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Spinner } from "../../spinner";

export const RegisterVerifyCodePage = ({ emailAddress, password, setErrorMessage }: { emailAddress: string, password: string, setErrorMessage: (errorMsg: string) => void }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const { signUp, setActive } = useSignUp();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleResendVerificationCode = async () => {
        setVerificationCode(''); // Clear input
        setErrorMessage(''); // Clear errors
        await signUp?.create({
            emailAddress,
            password
        }).then(async (result) => {
            result.prepareVerification({ strategy: 'email_code' });
        }).catch((err) => { console.log(err.errors[0]) });
    }

    const attemptEmailVerification = async () => {
        if (!verificationCode) return;
        setIsLoading(true);

        await signUp?.attemptVerification({
            strategy: 'email_code',
            code: verificationCode
        }).then((result) => {
            if (result.status === "complete") {
                setActive({ session: result.createdSessionId });

                // Insert a new registered user to prisma DB
                fetch(`${process.env.defaultApiEndpoint}/api/auth`, {
                    body: JSON.stringify({
                        type: 'createNew',
                        userId: result.createdUserId,
                    })
                }).then(async (response) => {
                    const { status } = await response.json();
                    if (status === 'success') {
                        setIsLoading(false);
                        router.push('/');
                    }
                });
            }
        }).catch((error) => {
            switch (error.errors[0].code) {
                case "form_code_incorrect": {
                    setErrorMessage('Neteisingas patvirtinimo kodas. Patikrinkite ir bandykite iš naujo.');
                    break;
                }
                default: {
                    console.log(error.errors[0]);
                    setErrorMessage(error.errors[0].longMessage)
                    break;
                }
            }
        })
    }

    return (
        <>
            <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                <span className={`font-medium text-[0.875rem]`}>Registracija</span>
                <span className={`text-[0.75rem] text-center`}>Į nurodytą el. paštą buvo išsiųstas patvirtinimo kodas.</span>
            </div>
            <CustomInput type='text' name="verify_code" placeholder={`Patvirtinimo kodas`} value={verificationCode} setValue={setVerificationCode} isRequired={true} />
            <span className={`w-full text-base text-secondary text-right`}>Negavote kodo? <CooldownButton type='button' cooldownByDefault={true} cooldown={30000} text={`Siųsti dar kartą`} className={`text-highlight`} buttonClicked={handleResendVerificationCode} /></span>
            <button
                type="button"
                className={`flex items-center justify-center gap-[0.5rem] bg-primary w-full rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}
                onClick={attemptEmailVerification}
            >Patvirtinti {isLoading && <Spinner />}</button>
        </>
    )
}