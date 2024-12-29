"use client";

import Header from "@/components/header/header";
import useAuth from "@/hooks/use-auth";
import useAuthStore from "@/stores/auth-store";
import { useEffect } from "react";
import AuthLoadingState from "./AuthLoadingState";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAuthStore();
    const { getProfile } = useAuth();

    useEffect(() => {
        if (accessToken === null) {
            getProfile();
        }
    }, [accessToken, getProfile]);

    return (
        <>
            <Header />
            {children}
            <AuthLoadingState />
        </>
    );
};

export default ClientLayout;
