"use client";

import { useSearchParams } from "next/navigation";
import { ActionSection } from "./ActionSection";
import { PostSection } from "./Posts/PostSection";
import { getUrlParams } from "@/lib/getUrlParams";

export const AdminPage = () => {
    const searchParamsString = useSearchParams();
    const searchParams = getUrlParams(searchParamsString);

    return (
        <div className={`flex flex-col gap-[1.25rem] flex-1`}>
            <div className={`flex flex-col gap-[0.88rem] text-base full_hd:text-base_2xl`}>
                <span className={`text-primary`}>Administracijos meniu</span>
                <span className={`text-placeholder_secondary`}>Visus veiksmus susijusius su skelbimų valdymu ir t.t galite atlikti šioje skiltyje</span>
            </div>
            <hr className={`w-full bg-border text-border`} />
            <ActionSection />
            {searchParams.includes("posts") && (
                <PostSection />
            )}
        </div>
    );
}