"use client";

import { getUrlParams } from "@/lib/getUrlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type WindowType = "posts" | "users";

type ButtonProps = {
    children: React.ReactNode;
    activeWindow: WindowType;
    window: WindowType;
    setActiveWindow: (window: WindowType) => void;
};

const ValidWindows: WindowType[] = ["posts", "users"];

const isValidWindowParam = (param: string) => {
    return ValidWindows.includes(param as WindowType);
}

const checkParams = (params: Object) => {
    if (!params || Object.keys(params).length <= 0) return ValidWindows[0];

    for (const param of Object.keys(params)) {
        if (isValidWindowParam(param)) return param as WindowType;
    }

    return ValidWindows[0];
};


export const ActionSection = () => {
    const searchParamsString = useSearchParams();
    const searchParams = getUrlParams(searchParamsString);
    const [activeWindow, setActiveWindow] = useState<WindowType>(checkParams(searchParams));
    const router = useRouter();

    const PageButtons: { [key in WindowType]: string } = {
        posts: "Skelbimų veiksmai",
        users: "Vartotojų veiksmai"
    };

    useEffect(() => {
        if (searchParams.length <= 0) {
            router.push(`?${activeWindow}`);
        }
    }, []);

    useEffect(() => {
        router.push(`?${activeWindow}`);
    }, [activeWindow]);

    return (
        <div>
            <div className={`flex gap-[2rem]`}>
                {Object.keys(PageButtons).map((window, idx) => (
                    <RenderButton activeWindow={activeWindow} window={window as WindowType} setActiveWindow={setActiveWindow} key={`admin_window_${idx}`}>{PageButtons[window as keyof typeof PageButtons]}</RenderButton>
                ))}
            </div>
        </div>
    )
};

const RenderButton = ({ children, activeWindow, window, setActiveWindow }: ButtonProps) => {
    const ChangeWindow = () => {
        if (activeWindow === window) return;
        setActiveWindow(window);
    }
    
    return (
        <span onClick={ChangeWindow} className={`${activeWindow === window ? `text-highlight` : `text-placeholder_secondary`} text-base full_hd:text-base_2xl hover:cursor-pointer`}>{children}</span>
    )
}