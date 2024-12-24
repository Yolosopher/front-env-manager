"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/auth-store";
import useAuth from "@/hooks/use-auth";
import Header from "@/components/header/header";

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
        </>
    );
};

export default ClientLayout;
