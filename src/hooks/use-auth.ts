"use client";

import { authApi } from "@/api/auth.api";
import {
    loginSchema,
    signupSchema,
} from "@/app/auth/_components/auth.validations";
import useAuthStore from "@/stores/auth-store";
import { z } from "zod";
import { toast } from "./use-toast";
import { useCallback } from "react";

const loggedOutAuthState: AuthState = {
    id: "",
    email: "",
    fullName: "",
    provider: null,
    providerId: null,
    avatar: null,
    deleted: false,
    createdAt: "",
    updatedAt: "",
};

const useAuth = () => {
    const { accessToken, setAccessToken, setAuth } = useAuthStore();

    const signup = async (
        data: Omit<z.infer<typeof signupSchema>, "confirmPassword">
    ) => {
        const response = await authApi.signup(data);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Signup successful",
            });
            setAccessToken(response.data.accessToken);
        }
    };

    const login = async (data: z.infer<typeof loginSchema>) => {
        const response = await authApi.login(data);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "Login successful",
            });
            setAccessToken(response.data.accessToken);
            getProfile();
        }
    };

    const logout = useCallback(async () => {
        setAccessToken("");
        setAuth(loggedOutAuthState);
    }, [setAccessToken, setAuth]);

    const getProfile = useCallback(async () => {
        const getServerResponse = async (act: string) => {
            const response = await authApi.getProfile(act);
            if (response.error) {
                logout();
            } else {
                setAuth(response.data);
            }
        };
        if (!accessToken) {
            const lsAccessToken = localStorage.getItem("accessToken") || "";
            if (!lsAccessToken) {
                logout();
            } else {
                setAccessToken(lsAccessToken);
                getServerResponse(lsAccessToken);
                return;
            }
        } else {
            getServerResponse(accessToken);
        }
    }, [accessToken, logout, setAccessToken, setAuth]);

    return {
        signup,
        login,
        logout,
        getProfile,
    };
};

export default useAuth;
