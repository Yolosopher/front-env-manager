"use client";

import useAuthStore from "@/stores/auth-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function ProtectedLayout({
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
        if (!auth) {
            router.replace("/auth/login");
        }
    }, [auth, accessToken, router]);

    return accessToken === null ? null : (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
