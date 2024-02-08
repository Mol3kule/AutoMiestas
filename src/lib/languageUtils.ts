import { useUserStore } from "@/store/user/user.store";
import lt from '@/dictionaries/lt.json';
import en from '@/dictionaries/en.json';

import ltErrors from '@/dictionaries/errors/lt.errors.json';

export const LanguageMap = {
    lt: {
        ...lt,
        errors: ltErrors
    },
    en
};

export const useLanguage = () => {
    const { language } = useUserStore();

    const dictionary = LanguageMap[language];
    return dictionary;
}

export const getLanguageByLocale = (locale: keyof typeof LanguageMap) => {
    return LanguageMap[locale];
}