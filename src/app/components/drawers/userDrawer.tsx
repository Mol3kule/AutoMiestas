'use client';

import { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import { Archive, Heart, LogIn, LogOut, Settings, User, WalletCards } from "lucide-react";
import UserBlankIcon from '/public/assets/icons/user.svg';
import Link from "next/link";


export const UserDrawer = () => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const avatarRef = useRef(null);
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    const UserIconClick = () => {
        setIsExpanded(!isExpanded);
    }

    const handleDocumentClick = (event: MouseEvent) => {
        if (avatarRef.current && !(avatarRef.current as HTMLElement).contains(event.target as Node)) {
            // Clicked outside the avatar, close the popup
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);


    const HandleSignInClick = () => {
        setIsExpanded(false);
        router.push('/sign-in');
    }

    const RenderItem = ({ children, path, color, title }: { children: React.ReactNode, path: string, color: string, title: string }) => {
        return (
            <Link href={path} className={`flex gap-[0.5rem] rounded-[0.1875rem] py-[0.44rem] items-center ${usePathname() == path ? `bg-highlight_secondary px-[0.40rem]` : `px-[0.37rem]`} hover:bg-highlight_secondary`}>
                {children}
                <span className={`text-primary text-base ${color}`}>{title}</span>
            </Link>
        )
    }

    const HandleSignOut = async () => {
        setIsExpanded(false);
        await signOut();
        router.push('/');
    }

    return (
        <div style={{ position: 'relative', display: 'inline-block' }} ref={avatarRef}>
            {isLoaded && !user && (
                <button type="button" onClick={HandleSignInClick} className={`px-[0.62rem] py-[0.31rem] bg-highlight_secondary text-primary text-base`}>Prisijungti</button>
            )}

            {isLoaded && user && (
                <User className={`text-primary w-[1.375rem] h-[1.375rem]`} onClick={UserIconClick} />
            )}

            {isExpanded && user && (
                <div className={`absolute w-[13.125rem] rounded-[0.1875rem] mt-[0.25rem] right-0 bg-[#FFF] shadow-[0_2px_4px_rgb(0,0,0,0.1)] animate-out duration-1000`}>
                    <div className={`flex flex-col gap-[0.1rem] px-[1rem] py-[1.25rem] text-primary text-base`}>
                        <div className={`flex flex-col px-[0.37rem]`}>
                            <span className={`text-placeholder_secondary text-[0.625rem]`}>Mano duomenys</span>
                            <span className={`text-primary text-base`}>{user.fullName}</span>
                        </div>
                        {/* Links */}
                        <RenderItem path={`/favorites`} title={`Įsiminti skelbimai`} color={``}>
                            <Heart size={16} className={`text-highlight`} />
                        </RenderItem>
                        <RenderItem path={`/my_posts`} title={`Mano skelbimai`} color={``}>
                            <Archive size={16} className={`text-highlight`} />
                        </RenderItem>
                        <RenderItem path={`/buy_credits`} title={`Įsigyti kreditų`} color={``}>
                            <WalletCards size={16} className={`text-highlight`} />
                        </RenderItem>
                        <RenderItem path={`/profile/settings`} title={`Nustatymai`} color={``}>
                            <Settings size={16} className={`text-highlight`} />
                        </RenderItem>
                        <button type={`button`} onClick={HandleSignOut} className={`flex gap-[0.5rem] rounded-[0.1875rem] py-[0.44rem] px-[0.37rem] items-center hover:bg-highlight_secondary`}>
                            <LogOut size={16} className={`text-error_secondary`} />
                            <span className={`text-error_secondary text-base`}>Atsijungti</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}