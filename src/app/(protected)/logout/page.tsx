"use client";

import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";

const LogoutPage = () => {
    const { logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);
    return null;
};

export default LogoutPage;
