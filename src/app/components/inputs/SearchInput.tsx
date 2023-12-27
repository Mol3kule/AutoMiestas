import { Search } from "lucide-react"

export const SearchInput = () => {
    return (
        <div className={`flex border-[1px] border-border px-[1.25rem] py-[0.55rem] rounded-[0.1875rem]`}>
            <input
                className={`w-full placeholder:text-placeholder text-primary text-[0.75rem]`}
                placeholder={`Paieškos laukelis..`}
            />
            <Search color={`#D8D8D8`} size={`1rem`}/>
        </div>
    )
}