import { ShieldAlert } from "lucide-react";

type ErrorBoxProps = {
    title?: string;
    message: string;
};

const ErrorBox = ({ title, message }: ErrorBoxProps) => {
    return (
        <div className={`p-[1.56rem] flex gap-[1.25rem] items-center border-border border-[1px] rounded-[0.1875rem]`}>
            <ShieldAlert className={`w-[1.75rem] h-[1.75rem] text-error_secondary`} />
            <div className={`flex flex-col gap-[0.62rem] text-base full_hd:text-base_2xl`}>
                {title && (
                    <span className={`font-medium text-primary`}>{title}</span>
                )}
                <span className={`text-placeholder_secondary`}>{message}</span>
            </div>
        </div>
    )
}

export default ErrorBox;