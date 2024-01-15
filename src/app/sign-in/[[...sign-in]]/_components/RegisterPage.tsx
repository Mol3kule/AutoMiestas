'use client';

import { FormEvent, useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { CustomInput } from "@/app/components/inputs/CustomInput";
import { AuthWrapper } from "@/app/components/hooks/auth.hook";
import { LoginWithGoogleButton } from "@/app/components/buttons/loginWithGoogleButton";

import { useAuthStore } from "@/store/auth/auth.store";
import { ViewTypes } from "./AuthWrap";
import { z } from "zod";
import { CodeVerifyModal } from "@/app/components/modals/code_verify";
import axios from "axios";

type LoginPageProps = {
    ChangeView: (type: ViewTypes) => void;
};

const formValidationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
    password_repeat: z.string().min(5).max(20),
    first_name: z.string().min(3).max(20),
    last_name: z.string().min(3).max(20),
    phone: z.string().min(9).max(12),
    organization: z.string().max(20).optional()
});

export const RegisterPage = ({ ChangeView }: LoginPageProps) => {
    const [errorMessage, setErrorMessage] = useState('');

    const { email, password, password_repeat, first_name, last_name, phone_number, verificationCode, organization, setEmail, setPassword, setPasswordRepeat, setFirstName, setLastName, setPhoneNumber, setVerificationCode, setOrganization } = useAuthStore();
    const { signUp, setActive } = useSignUp();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEmailVerify, setEmailVerify] = useState<boolean>(false);
    const [isPhoneVerify, setPhoneVerify] = useState<boolean>(false);

    const HandleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== password_repeat) {
            setErrorMessage('Slaptažodžiai nesutampa.');
            return;
        }

        try {
            formValidationSchema.parse({
                email,
                password,
                password_repeat,
                first_name,
                last_name,
                phone: phone_number,
                organization
            });

            signUp?.create({
                emailAddress: email,
                password,
                firstName: first_name,
                lastName: last_name,
                phoneNumber: phone_number,
            }).then(async (result) => {
                if (result.status === "missing_requirements") {
                    await result.prepareVerification({ strategy: 'email_code' });
                    setEmailVerify(true);
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
        } catch (error) {
            if (error instanceof z.ZodError) {
                const { code, path } = error.errors[0];
                console.log(error.errors[0]);
                switch (path[0]) {
                    case 'first_name': {
                        if (code === 'too_small') {
                            setErrorMessage('Vardas per trumpas. Jis turi būti bent 3 simbolių ilgio.');
                        } else if (code === 'too_big') {
                            setErrorMessage('Vardas per ilgas. Jis turi būti ne ilgesnis nei 20 simbolių.');
                        }
                        break;
                    }
                    case 'last_name': {
                        if (code === 'too_small') {
                            setErrorMessage('Pavardė per trumpa. Ji turi būti bent 3 simbolių ilgio.');
                        } else if (code === 'too_big') {
                            setErrorMessage('Pavardė per ilga. Ji turi būti ne ilgesnė nei 20 simbolių.');
                        }
                        break;
                    }
                    case 'password': {
                        if (code === 'too_small') {
                            setErrorMessage('Slaptažodis per trumpas. Jis turi būti bent 5 simbolių ilgio.');
                        } else if (code === 'too_big') {
                            setErrorMessage('Slaptažodis per ilgas. Jis turi būti ne ilgesnis nei 20 simbolių.');
                        }
                        break;
                    }
                    case 'phone': {
                        if (code === 'too_small') {
                            setErrorMessage('Telefono numeris per trumpas. Jis turi būti bent 9 simbolių ilgio.');
                        } else if (code === 'too_big') {
                            setErrorMessage('Telefono numeris per ilgas. Jis turi būti ne ilgesnis nei 12 simbolių.');
                        }
                        break;
                    }
                }
            }
        }
    }

    const attemptEmailVerification = async () => {
        if (verificationCode.length <= 0 || isLoading) return;
        setIsLoading(true);

        try {
            const verificationResponse = await signUp?.attemptVerification({
                strategy: 'email_code',
                code: verificationCode
            });
            setVerificationCode(''); // Clear input

            console.log(verificationResponse);
            console.log(verificationResponse?.status);

            if (verificationResponse?.status === "missing_requirements") {
                await signUp?.prepareVerification({ strategy: 'phone_code' });
                setIsLoading(false);
                setEmailVerify(false);
                setPhoneVerify(true);
            }
        } catch (error: any) {
            switch (error.errors[0].code) {
                case "form_code_incorrect": {
                    setErrorMessage('Neteisingas patvirtinimo kodas. Patikrinkite ir bandykite iš naujo.');
                    break;
                }
                case "verification_failed": {
                    router.push('/sign-in');
                    break;
                }
                case "too_many_requests": {
                    setErrorMessage(error.errors[0].message);
                    break;
                }
                default: {
                    console.log(error.errors);
                    setErrorMessage(error.errors[0].longMessage)
                    break;
                }
            }
            setIsLoading(false);
        }
    }

    const resendEmailVerificationCode = () => {
        signUp?.prepareVerification({ strategy: 'email_code' });
    }

    const attemptPhoneVerification = async () => {
        if (verificationCode.length <= 0 || isLoading) return;
        setIsLoading(true);

        try {
            const verificationResponse = await signUp?.attemptVerification({
                strategy: 'phone_code',
                code: verificationCode
            });

            if (verificationResponse?.status === "complete") {
                if (!setActive) return;

                const createResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/auth/createUser`, {
                    userId: verificationResponse.createdUserId,
                    emailAddress: email,
                    first_name,
                    last_name,
                    phone_number,
                    organization
                }).then((response) => response.data);

                if (createResponse.status === 200) {
                    setActive({ session: verificationResponse.createdSessionId });
                    setVerificationCode(''); // Clear input
                    setEmail('');
                    setPassword('');
                    setPasswordRepeat('');
                    setFirstName('');
                    setLastName('');
                    setPhoneNumber('');
                    setOrganization('');
                    router.push('/');
                }
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const resendPhoneVerificationCode = () => {
        signUp?.prepareVerification({ strategy: 'phone_code' });
    }

    return (
        <AuthWrapper HandleFormSubmit={HandleSubmit}>
            {!isEmailVerify && !isPhoneVerify && (
                <>
                    <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                        <span className={`font-medium text-header_2xl`}>Registracija</span>
                        <span className={`text-base full_hd:text-base_2xl text-center`}>Užpildykite visus reikalingus laukus, jog tęstumėte.</span>
                    </div>
                    <div className={`flex flex-col w-full gap-[1.37rem]`}>
                        <CustomInput type='email' placeholder={`El. pašto adresas`} value={email ?? ''} setValue={setEmail} isRequired={true} />
                        <CustomInput type='password' placeholder={`Slaptažodis`} value={password} setValue={setPassword} isRequired={true} />
                        <CustomInput type='password' placeholder={`Pakartokite slaptažodį`} value={password_repeat} setValue={setPasswordRepeat} isRequired={true} />
                        <hr className={`bg-border text-border rounded-full h-[2px]`} />
                        <CustomInput type='text' placeholder={`Vardas`} value={first_name ?? ''} setValue={setFirstName} isRequired={true} />
                        <CustomInput type='text' placeholder={`Pavardė`} value={last_name ?? ''} setValue={setLastName} isRequired={true} />
                        <CustomInput type='text' placeholder={`Tel. numeris`} value={phone_number ?? ''} setValue={setPhoneNumber} isRequired={true} />
                        <CustomInput type='text' placeholder={`Organizacijos pavadinimas (neprivaloma)`} value={organization ?? ''} setValue={setOrganization} isRequired={false} />
                        <button type="submit" className={`bg-primary rounded-[0.1875rem] py-[0.88rem] text-[#FFF] text-base full_hd:text-base_2xl`}>Registruotis</button>
                        <span className={`text-base full_hd:text-base_2xl text-secondary`}>Jau turite paskyrą? <button type='button' className={`text-highlight`} onClick={() => ChangeView('login')}>Prisijungti</button></span>
                    </div>

                    <div className={`flex items-center w-full`}>
                        <hr className={`w-full text-border bg-border`} />
                        <span className={`text-border px-[1.25rem] text-base full_hd:text-base_2xl`}>Arba</span>
                        <hr className={`w-full text-border bg-border`} />
                    </div>

                    <div className={`w-full`}>
                        <LoginWithGoogleButton />
                    </div>
                </>
            )}

            {isEmailVerify && (
                <CodeVerifyModal
                    title={`Paskyros patvirtinimas`}
                    placeholder={`Į nurodytą el. paštą buvo išsiųstas patvirtinimo kodas.`}
                    code={verificationCode}
                    isLoading={isLoading}
                    setCode={setVerificationCode}
                    attemptVerify={attemptEmailVerification}
                    resendVerificationCode={resendEmailVerificationCode}
                />
            )}

            {isPhoneVerify && (
                <CodeVerifyModal
                    title={`Paskyros patvirtinimas`}
                    placeholder={`Į nurodytą tel. nr buvo išsiųstas patvirtinimo kodas.`}
                    code={verificationCode}
                    isLoading={isLoading}
                    setCode={setVerificationCode}
                    attemptVerify={attemptPhoneVerification}
                    resendVerificationCode={resendPhoneVerificationCode}
                />
            )}

            <div className={`flex items-center w-full bg-error py-[0.85rem] ${errorMessage ? 'block' : 'hidden'}`}>
                <span className={`w-full text-center text-primary text-base px-[1.55rem]`}>{errorMessage}</span>
            </div>
        </AuthWrapper>
    )
}