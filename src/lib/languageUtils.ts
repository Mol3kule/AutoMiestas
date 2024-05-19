import { useUserStore } from "@/store/user/user.store";
import lt from '@/dictionaries/lt/translation.json';
import en from '@/dictionaries/en/translation.json';

import ltErrors from '@/dictionaries/lt/errors.json';
import ltCountries from '@/dictionaries/lt/countries.json';

export const LanguageMap = {
    lt: {
        ...lt,
        errors: ltErrors,
        countries: ltCountries
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