"use client";

import useAuthStore from "@/stores/auth-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { HEADER_HEIGHT } from "@/config/styles";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient();

export default function ProtectedLayout({
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
        if (!auth.id) {
            router.replace("/auth/login");
        }
    }, [auth, router]);

    return auth === null ? null : (
        <QueryClientProvider client={queryClient}>
            <div
                style={{
                    height: `calc(96dvh - ${HEADER_HEIGHT}px)`,
                }}
                className={cn("flex w-full items-center justify-center p-6")}
            >
                <MagicCard
                    gradientSize={1400}
                    className="cursor-pointer justify-center shadow-2xl shadow-purple-500/40 whitespace-nowrap text-4xl !bg-background w-full"
                    gradientColor={"hsl(var(--primary))"}
                    gradientOpacity={0.1}
                >
                    <div className="flex flex-1 w-full h-full cursor-default">
                        {children}
                    </div>
                </MagicCard>
            </div>
        </QueryClientProvider>
    );
}
