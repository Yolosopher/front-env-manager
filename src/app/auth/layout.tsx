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
    const { auth } = useAuthStore();

    useEffect(() => {
        if (auth === null) {
            return;
        }
        if (auth.id) {
            router.replace("/dashboard");
        }
    }, [auth, router]);

    return auth === null ? null : children;
}
