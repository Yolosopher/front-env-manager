"use client";

import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const { auth } = useAuthStore();

    useEffect(() => {
        if (!auth) {
            router.replace("/auth/login");
        }
    }, [auth, router]);

    return children;
}
