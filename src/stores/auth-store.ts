"use client";
import { create } from "zustand";

type AuthStore = {
    accessToken: string | null;
    auth: AuthState | null;
    setAccessToken: (token: string) => void;
    resetAccessToken: () => void;
    setAuth: (auth: AuthState | null) => void;
    authLoading: boolean;
    setAuthLoading: (loading: boolean) => void;
};

const useAuthStore = create<AuthStore>()((set) => ({
    accessToken: null,
    auth: null,
    setAccessToken: (token) => {
        localStorage.setItem("accessToken", token || "");
        set({ accessToken: token });
    },
    resetAccessToken: () => {
        set({ accessToken: null });
    },
    setAuth: (auth) => set({ auth }),
    authLoading: true,
    setAuthLoading: (loading) => set({ authLoading: loading }),
}));

export default useAuthStore;
