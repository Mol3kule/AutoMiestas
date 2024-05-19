'use client';

type CustomInputProps = {
    type: React.HTMLInputTypeAttribute;
    name?: string;
    placeholder: string;
    value: string;
    isRequired: boolean;
    minLength?: number;
    maxLength?: number;
    setValue: (value: string) => void;
}

export const CustomInput = ({ type, name, placeholder, value, setValue, isRequired, minLength = 3, maxLength = 30 }: CustomInputProps) => {
    const changeValue = (newValue: string) => {
        if (type === 'number') {
            setValue(newValue.replace(/[^0-9]/g, ''));
            return;
        }
        setValue(newValue);
    }

    return (
        <input
            type={type !== 'number' ? type : 'text'}
            name={name}
            // minLength={minLength}
            maxLength={maxLength}
            className={`w-full border-[1px] border-border rounded-[0.1875rem] px-[1.55rem] py-[0.88rem] text-base full_hd:text-base_2xl placeholder:text-placeholder text-primary`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => changeValue(e.target.value)}
            required={isRequired}
        />
    )
}