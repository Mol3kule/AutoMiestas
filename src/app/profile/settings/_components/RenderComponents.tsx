"use client";

import { z } from "zod";
import { UserType } from "@/types/user.type";
import { ProfileInformation } from "./ProfileInformation";
import { FormEvent, useEffect, useState } from "react";
import { useLanguage } from "@/lib/languageUtils";

const formValidationSchema = z.object({
    first_name: z.string().min(3).max(20),
    last_name: z.string().min(3).max(20),
    email: z.string().email(),
    phone: z.string().min(9).max(12),
});

export const RenderComponents = ({ userData }: { userData: UserType }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const t = useLanguage();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        try {
            setErrorMessage('');
            const validated = formValidationSchema.parse({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            });

            // const updateResponse = await axios.post(`${process.env.defaultApiEndpoint}/api/auth/updateUser`, {
            //     userData: validated
            // }).then((res) => res.data);

            // if (updateResponse.status !== 200) {
            //     return; // Handle error
            // }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const { code, path } = error.errors[0];
                switch (path[0]) {
                    case 'first_name': {
                        if (code === 'too_small') {
                            setErrorMessage(t.profile.first_name_too_short);
                        } else if (code === 'too_big') {
                            setErrorMessage(t.profile.first_name_too_long);
                        }
                        break;
                    }
                    case 'last_name': {
                        if (code === 'too_small') {
                            setErrorMessage(t.profile.last_name_too_short);
                        } else if (code === 'too_big') {
                            setErrorMessage(t.profile.last_name_too_long);
                        }
                        break;
                    }
                    case 'email': {
                        if (code === 'invalid_string') {
                            setErrorMessage(t.profile.invalid_email_string);
                        }
                        break;
                    }
                    case 'phone': {
                        setErrorMessage(t.profile.phone_invalid_string);
                        break;
                    }
                    default: {
                        console.log(error.errors[0]);
                        break;
                    };
                }
            }
        }
    }


    useEffect(() => {
        if (!userData.phone_number) {
            setErrorMessage(t.profile.phone_required);
        }
    }, []);

    return (
        <form className={`flex flex-col gap-[1.56rem]`} onSubmit={handleSubmit}>
            {errorMessage && (
                <div className={`px-[1.56rem] py-[0.87rem] bg-error rounded-[0.1875rem]`}>
                    <span className={`text-primary text-base full_hd:text-base_2xl`}>{errorMessage}</span>
                </div>
            )}

            <ProfileInformation userData={userData} />

            {/* <div className={`flex items-center justify-end gap-[1.25rem]`}>
                <button type="button" className={`rounded-[0.1875rem] text-error_secondary text-base full_hd:text-base_2xl`}>Ištrinti paskyrą</button>
                <button type="submit" className={`px-[3.06rem] py-[0.72rem] bg-primary text-[#FFF] rounded-[0.1875rem] text-base full_hd:text-base_2xl`}>Išsaugoti</button>
            </div> */}
        </form>
    )
}