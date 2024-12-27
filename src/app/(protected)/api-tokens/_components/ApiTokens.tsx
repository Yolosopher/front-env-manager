"use client";

import { apiTokenApi } from "@/api/api-token.api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import GenerateApiToken from "./GenerateApiToken";
import RenderTokens from "./RenderTokens";

const ApiTokens = () => {
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
        staleTime: 1000 * 60 * 1,
    });

    return (
        <div className="w-full h-full flex flex-col">
            <ScrollArea className="w-full">
                <div className="p-6 w-full flex flex-col gap-6 overflow-auto items-stretch h-full min-h-96">
                    <h1 className="text-3xl font-bold text-center text-primary">
                        API Tokens
                    </h1>
                    <GenerateApiToken />
                    <RenderTokens
                        tokens={apiTokens || []}
                        isLoadingApiTokens={isLoadingApiTokens}
                    />
                </div>
            </ScrollArea>
        </div>
    );
};

export default ApiTokens;
