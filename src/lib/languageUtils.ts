import { useUserStore } from "@/store/user/user.store";
import lt from '@/dictionaries/lt.json';
import en from '@/dictionaries/en.json';

export const LanguageMap = { lt, en };

export const useLanguage = () => {
    const { language } = useUserStore();

    const dictionary = LanguageMap[language];
    return dictionary;
}