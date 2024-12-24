"use client";

import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { auth, accessToken } = useAuthStore();

    useEffect(() => {
        if (accessToken === null) {
            return;
        }
        if (auth) {
            router.replace("/dashboard");
        }
    }, [auth, accessToken, router]);

    return accessToken === null ? null : children;
}
