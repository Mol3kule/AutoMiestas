export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`flex flex-col gap-[20px]`}>
            <div className={`px-[1.87rem] 2xl:px-[31.25rem] mt-[1rem] flex flex-col gap-[20px]`}>
                {children}
            </div>
        </div>
    );
}