'use client';
import ReactModal from "react-modal";

ReactModal.setAppElement('body');

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`flex flex-col gap-[20px]`}>
            <div className={`h-full px-[1.87rem] laptop:px-[15.5rem] hd:px-[31.25rem] py-[2.20rem] flex flex-col gap-[20px]`}>
                {children}
            </div>
        </div>
    );
}