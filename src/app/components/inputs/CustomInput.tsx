'use client';

export const CustomInput = ({ type, name, placeholder, value, setValue, isRequired }: { type: React.HTMLInputTypeAttribute, name: string, placeholder: string, value: string, setValue: (value: string) => void, isRequired: boolean }) => {
    return (
        <input
            type={type}
            name={name}
            className={`w-full border-[1px] border-border rounded-[0.1875rem] h-[2.6875rem] px-[1.55rem] text-[0.75rem] placeholder:text-placeholder text-primary`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={isRequired}
        />
    )
}