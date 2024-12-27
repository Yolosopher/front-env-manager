"use client";

import { apiTokenApi } from "@/api/api-token.api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const InfoTokens = () => {
    const router = useRouter();
    const accessToken = useAuthStore((state) => state.accessToken!);

    const { data: apiTokens, isLoading: isLoadingApiTokens } = useQuery<
        ApiToken[]
    >({
        queryKey: ["api-tokens"],
        queryFn: async () => {
            const response = await apiTokenApi.findAll(accessToken!);
            if (response.error) {
                toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                });
                throw new Error(response.error);
            }
            return (response.data || []) as ApiToken[];
        },
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 1, // 1 min
    });

    const totalTokens = useMemo(() => {
        return apiTokens?.length || 0;
    }, [apiTokens]);

    return (
        <Card
            className="w-full h-full cursor-pointer flex items-center justify-center p-0"
            onClick={() => router.push("/api-tokens")}
        >
            <CardContent className="flex w-full items-center justify-center gap-2 p-4">
                <CardTitle>Tokens:</CardTitle>
                {isLoadingApiTokens ? (
                    <Skeleton className="w-full h-full bg-secondary rounded-md p-4 " />
                ) : (
                    <p>{totalTokens}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default InfoTokens;
