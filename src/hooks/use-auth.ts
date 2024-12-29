"use client";

import { authApi } from "@/api/auth.api";
import {
    loginSchema,
    signupSchema,
} from "@/app/auth/_components/auth.validations";
import useAuthStore from "@/stores/auth-store";
import { useCallback } from "react";
import { z } from "zod";
import { toast } from "./use-toast";

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
    const {
        accessToken,
        setAccessToken,
        setAuth,
        setAuthLoading,
        authLoading,
    } = useAuthStore();

    const signup = async (
        data: Omit<z.infer<typeof signupSchema>, "confirmPassword">
    ) => {
        setAuthLoading(true);
        const response = await authApi.signup(data);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
            setAuthLoading(false);
        } else {
            toast({
                title: "Success",
                description: "Signup successful",
            });
            setAccessToken(response.data.accessToken);
            getProfile();
        }
    };

    const githubAuth = useCallback(async () => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
        const githubRedirectUrl = `${baseUrl}/auth/github`;
        window.location.href = githubRedirectUrl;
    }, []);

    const logout = useCallback(async () => {
        if (!authLoading) {
            setAuthLoading(true);
        }
        setAccessToken("");
        setAuth(loggedOutAuthState);
        setAuthLoading(false);
    }, [setAccessToken, setAuth, setAuthLoading, authLoading]);

    const getProfile = useCallback(async () => {
        if (!authLoading) {
            setAuthLoading(true);
        }
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
                getServerResponse(lsAccessToken).then(() => {
                    setAuthLoading(false);
                });
                return;
            }
        } else {
            getServerResponse(accessToken).then(() => {
                setAuthLoading(false);
            });
        }
    }, [
        accessToken,
        authLoading,
        logout,
        setAccessToken,
        setAuth,
        setAuthLoading,
    ]);

    const login = useCallback(
        async (data: z.infer<typeof loginSchema>) => {
            setAuthLoading(true);
            const response = await authApi.login(data);
            if (response.error) {
                toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                });
                setAuthLoading(false);
            } else {
                toast({
                    title: "Success",
                    description: "Login successful",
                });
                setAccessToken(response.data.accessToken);
                getProfile();
            }
        },
        [setAuthLoading, setAccessToken, getProfile]
    );
    return {
        signup,
        login,
        logout,
        getProfile,
        githubAuth,
    };
};

export default useAuth;
