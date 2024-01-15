import { CooldownButton } from "../buttons/cooldownButton";
import { CustomInput } from "../inputs/CustomInput"
import { Spinner } from "../spinner";

type CodeVerifyModalProps = {
    title: string;
    placeholder: string;
    code: string;
    isLoading: boolean;
    setCode: (code: string) => void;
    attemptVerify: () => void;
    resendVerificationCode: () => void;
}

export const CodeVerifyModal = ({ title, placeholder, code, isLoading, setCode, attemptVerify, resendVerificationCode }: CodeVerifyModalProps) => {
    return (
        <>
            <div className={`flex flex-col items-center text-primary gap-[0.5rem]`}>
                <span className={`font-medium text-[0.875rem]`}>{title}</span>
                <span className={`text-[0.75rem] text-center`}>{placeholder}</span>
            </div>
            <CustomInput type='text' placeholder={`Patvirtinimo kodas`} value={code} setValue={setCode} isRequired={true} />
            <span className={`w-full text-base text-secondary text-right`}>Negavote kodo? <CooldownButton type='button' cooldownByDefault={true} cooldown={30000} text={`Siųsti dar kartą`} className={`text-highlight`} buttonClicked={resendVerificationCode} /></span>
            <button
                type="button"
                className={`flex items-center justify-center gap-[0.5rem] bg-primary w-full rounded-[0.1875rem] h-[2.6875rem] text-[#FFF] text-[0.75rem]`}
                onClick={attemptVerify}
            >{!isLoading ? `Patvirtinti` : <Spinner />}</button>
        </>
    )
}