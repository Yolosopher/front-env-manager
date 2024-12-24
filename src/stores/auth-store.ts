"use client";
import { create } from "zustand";

type AuthStore = {
    accessToken: string | null;
    auth: AuthState | null;
    setAccessToken: (token: string) => void;
    setAuth: (auth: AuthState | null) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
    accessToken: null,
    auth: null,
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", token || "");

        set({ accessToken: token });
    },
    setAuth: (auth) => set({ auth }),
}));

export default useAuthStore;
