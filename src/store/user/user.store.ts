import { create } from "zustand";

type Language = 'lt';

type UserStore = {
    language: Language;
}

export const useUserStore = create<UserStore>()((set) => ({
    language: 'lt',

    setLanguage: (language: Language) => set({ language })
}));