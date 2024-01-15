import { create } from "zustand";

type Store = {
    email: string;
    password: string;
    password_repeat: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    organization: string;
    verificationCode: string;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setPasswordRepeat: (password_repeat: string) => void;
    setFirstName: (first_name: string) => void;
    setLastName: (last_name: string) => void;
    setPhoneNumber: (phone_number: string) => void;
    setOrganization: (organization: string) => void;
    setVerificationCode: (verificationCode: string) => void;
};

export const useAuthStore = create<Store>()((set) => ({
    email: '',
    password: '',
    password_repeat: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    organization: '',
    verificationCode: '',

    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setPasswordRepeat: (password_repeat: string) => set({ password_repeat }),
    setFirstName: (first_name: string) => set({ first_name }),
    setLastName: (last_name: string) => set({ last_name }),
    setPhoneNumber: (phone_number: string) => set({ phone_number }),
    setOrganization: (organization: string) => set({ organization }),
    setVerificationCode: (verificationCode: string) => set({ verificationCode }),
}));