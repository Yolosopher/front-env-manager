"use client";
import { create } from "zustand";

type AuthStore = {
    accessToken: string | null;
    auth: AuthState | null;
    setAccessToken: (token: string | null) => void;
    setAuth: (auth: AuthState | null) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
    accessToken: (() => localStorage.getItem("accessToken") || null)(),
    auth: null,
    setAccessToken: (token) => {
        if (token) {
            localStorage.setItem("accessToken", token);
        } else {
            localStorage.removeItem("accessToken");
        }
        set({ accessToken: token });
    },
    setAuth: (auth) => set({ auth }),
}));

export default useAuthStore;
