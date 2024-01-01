'use client';

export const NextButton = ({ children, onClick }: { children?: React.ReactNode, onClick?: () => void, fullWidth?: boolean }) => {
    return (
        <button
            type={`button`}
            className={`px-[3.60rem] py-[0.72rem] bg-primary text-[#FFF] rounded-[0.1875rem] w-full laptop:w-auto`}
            onClick={onClick}
        >{children}</button>
    );
};