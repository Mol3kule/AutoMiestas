'use client';

import { useRouter } from 'next/navigation';
import { ModalWrapper } from "../hooks/modal.hook"

import { Suspense, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { LoginPage } from '../pages/auth/loginPage';
import { RegisterPage } from '../pages/auth/registerPage';
import { PasswordResetPage } from '../pages/auth/passwordResetPage';
import { Spinner } from '../spinner';

type ViewTypes = 'login' | 'register' | 'password_reset'

export const AuthModal = () => {
    const [viewType, setViewType] = useState<ViewTypes>('login');
    const router = useRouter();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            router.push('/');
        }
    }, [isLoaded]);

    return (
        <>
            {!isLoaded ? (
                <ModalWrapper>
                    <Spinner size={5} />
                </ModalWrapper>
            ) : (
                !user && (
                    <ModalWrapper>
                        {viewType === 'login' && (
                            <Suspense fallback={<Spinner />}>
                                <LoginPage ChangeView={() => setViewType('register')} ResetPassword={() => setViewType('password_reset')} />
                            </Suspense>
                        )}

                        {viewType === 'register' && (
                            <Suspense fallback={<Spinner />}>
                                <RegisterPage ChangeView={() => setViewType('login')} />
                            </Suspense>
                        )}

                        {viewType === 'password_reset' && (
                            <Suspense fallback={<Spinner />}>
                                <PasswordResetPage ChangeView={() => setViewType('login')} />
                            </Suspense>
                        )}
                    </ModalWrapper>
                )
            )}
        </>
    );
}