"use client";
import { getUrlParams } from "@/lib/getUrlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PostAdminPage } from "./PostPage";

type PostSectionWindows = "active" | "inactive" | "drafts";
const AvailableWindows: PostSectionWindows[] = ["active", "inactive", "drafts"];

type RenderButtonProps = {
    children: React.ReactNode;
    activeWindow: PostSectionWindows;
    window: PostSectionWindows;
    setActive: (window: PostSectionWindows) => void;
};

const checkParams = (params: Array<string>) => {
    if (!params || Object.keys(params).length <= 1) return AvailableWindows[0];

    for (const param of params) {
        if (AvailableWindows.includes(param as PostSectionWindows)) return param as PostSectionWindows;
    }

    return AvailableWindows[0];
};

export const PostSection = () => {
    const searchParamsString = useSearchParams();
    const params = getUrlParams(searchParamsString);

    const [activeWindow, setActiveWindow] = useState<PostSectionWindows>(checkParams(params));
    const router = useRouter();

    const PageButtons: { [key in PostSectionWindows]: string } = {
        active: "Aktyvūs skelbimai",
        inactive: "Skelbimai laukiantys patvirtinimo",
        drafts: "Skelbimai be prenumeratos"
    };

    useEffect(() => {
        if (params.length <= 0) return;
        router.replace(`?${params[0]}&${activeWindow}`);
    }, []);

    useEffect(() => {
        if (params.length <= 0) return;
        router.replace(`?${params[0]}&${activeWindow}`);
    }, [activeWindow]);

    return (
        <div className={`flex flex-col gap-[2.19rem] flex-1`}>
            <div className={`flex gap-[1.25rem]`}>
                {AvailableWindows.map((window, idx) => (
                    <RenderButton activeWindow={activeWindow} window={window} setActive={setActiveWindow} key={`admin_post_window_${idx}`}>{PageButtons[window as keyof typeof PageButtons]}</RenderButton>
                ))}
            </div>
            <PostAdminPage />
        </div>
    );
};

const RenderButton = ({ children, activeWindow, window, setActive }: RenderButtonProps) => {
    const HandleSwitch = () => {
        if (activeWindow === window) return;
        setActive(window);
    };
    return (
        <button
            className={`px-[0.62rem] py-[0.5rem] rounded-[0.1875rem] ${activeWindow === window ? `text-[#FFF] bg-highlight` : `text-primary bg-highlight_secondary`}`}
            onClick={HandleSwitch}
        >
            {children}
        </button>
    )
}