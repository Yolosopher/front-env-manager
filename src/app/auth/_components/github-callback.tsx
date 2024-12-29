"use client";

import useAuthStore from "@/stores/auth-store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GithubCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | null>(null);
    const paramToken = searchParams.get("token");
    const { resetAccessToken } = useAuthStore();

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (paramToken) {
            localStorage.setItem("accessToken", paramToken);
            resetAccessToken();
        } else {
            setError("Github authentication failed");
            timeout = setTimeout(() => {
                router.replace("/auth/login");
            }, 300);
        }
        return () => clearTimeout(timeout);
    }, [paramToken, resetAccessToken, router]);

    return (
        <div className="flex h-screen items-center justify-center w-full">
            <div className="flex flex-col gap-4 p-6 w-full items-stretch">
                <h1 className="text-2xl font-semibold">
                    Github Authentication
                </h1>
                <div className="rounded-lg bg-muted p-4 w-full overflow-auto">
                    <p className="text-sm text-muted-foreground">
                        Access Token:
                    </p>
                    <code className="text-sm w-full overflow-hidden">
                        {paramToken || "No access token"}
                    </code>
                </div>
                {error && (
                    <div className="rounded-lg bg-destructive/15 p-4 text-destructive">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GithubCallback;
