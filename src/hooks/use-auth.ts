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
        }
    };

    const logout = useCallback(async () => {
        if (accessToken) {
            const response = await authApi.logout(accessToken);
            if (response.error) {
                toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                });
            }
        }
        setAccessToken(null);
        setAuth(null);
    }, [accessToken, setAccessToken, setAuth]);

    const getProfile = useCallback(async () => {
        if (!accessToken) {
            setAuth(null);
            return;
        }
        const response = await authApi.getProfile(accessToken);
        if (response.error) {
            logout();
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            setAuth(response.data);
        }
    }, [accessToken, logout, setAuth]);

    return {
        signup,
        login,
        logout,
        getProfile,
    };
};

export default useAuth;
