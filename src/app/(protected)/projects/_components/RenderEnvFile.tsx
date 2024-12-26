"use client";

import { environmentApi } from "@/api/environment.api";
import Code from "@/components/ui/code";
import { toast } from "@/hooks/use-toast";
import { jsonToEnv } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type RenderEnvFileProps = {
    environment: Environment | null;
};

const RenderEnvFile = ({ environment }: RenderEnvFileProps) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const queryClient = useQueryClient();
    const router = useRouter();
    const removeEnvironment = useCallback(
        async (envId: string) => {
            const response = await environmentApi.delete(envId, accessToken!);

            if (response.error) {
                toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                });
                return;
            }

            await queryClient.refetchQueries({
                queryKey: ["projects"],
            });

            toast({
                title: "Environment deleted",
                description: "Environment deleted",
            });
            router.push(`/projects`);
        },
        [accessToken, queryClient, router]
    );
    const { envCode, filename } = useMemo(() => {
        if (!environment) {
            return {
                envCode: "",
                filename: "",
            };
        }
        const envCode = jsonToEnv(environment.variables);
        return {
            envCode,
            filename: environment.name,
        };
    }, [environment]);

    return (
        <div className="w-full h-full overflow-hidden">
            {environment && (
                <Code
                    code={envCode}
                    language="dotenv"
                    filename={filename}
                    removeEnvironment={removeEnvironment}
                    environmentId={environment.id}
                />
            )}
        </div>
    );
};

export default RenderEnvFile;
