"use client";

import { Spinner } from "@/components/spinner";
import { Suspense, useState } from "react";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { PasswordResetPage } from "./PasswordResetPage";

export type ViewTypes = 'login' | 'register' | 'password_reset';

export const AuthWrap = () => {
    const [viewType, setViewType] = useState<ViewTypes>('login');
    return (
        <>
            {viewType === 'login' && (
                <Suspense fallback={<Spinner />}>
                    <LoginPage ChangeView={setViewType} />
                </Suspense>
            )}

            {viewType === 'register' && (
                <Suspense fallback={<Spinner />}>
                    <RegisterPage ChangeView={setViewType} />
                </Suspense>
            )}

            {viewType === 'password_reset' && (
                <Suspense fallback={<Spinner />}>
                    <PasswordResetPage ChangeView={setViewType} />
                </Suspense>
            )}
        </>
    )
}