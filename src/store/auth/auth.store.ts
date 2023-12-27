import { create } from "zustand";
import { TAuthStore } from "./types/auth.type";

export const useAuthStore = create<TAuthStore>()((set) => ({
    isLoginModalOpen: false,

    setLoginModalStatus: (isLoginModalOpen: boolean) => set({ isLoginModalOpen })
}));