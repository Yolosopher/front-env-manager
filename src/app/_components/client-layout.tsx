"use client";

import { useEffect } from "react";
import useAuthStore from "@/stores/auth-store";
import useAuth from "@/hooks/use-auth";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const { accessToken } = useAuthStore();
    const { getProfile } = useAuth();

    useEffect(() => {
        getProfile();
    }, [accessToken, getProfile]);

    return children;
};

export default ClientLayout;
