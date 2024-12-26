"use client";

import { environmentApi } from "@/api/environment.api";
import { newEnvSchema } from "@/app/(protected)/projects/_components/newenv.validations";
import { parseEnvString } from "@/lib/utils";
import useAuthStore from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "./use-toast";

const useCreateEnv = (projectName: string) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const router = useRouter();
    const [code, setCode] = useState<string>("");
    const form = useForm<z.infer<typeof newEnvSchema>>({
        resolver: zodResolver(newEnvSchema),
        defaultValues: {
            name: "envrionment name",
        },
    });

    const queryClient = useQueryClient();

    const onProjectCreated = (newProjectId: string) => {
        router.push(`/projects/${newProjectId}`);
    };

    const onSubmit = useCallback(
        async (values: z.infer<typeof newEnvSchema>) => {
            const queryProjects = queryClient.getQueryData<Project[]>([
                "projects",
            ]);

            const projectId = queryProjects?.find(
                (prjct) => prjct.name === projectName
            )?.id;

            if (!projectId) {
                toast({
                    title: "Project not found",
                    description: "Project not found",
                    variant: "destructive",
                });
                return;
            }

            const response = await environmentApi.create(
                projectId,
                {
                    name: values.name,
                    projectId,
                    variables: parseEnvString(code),
                },
                accessToken!
            );
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
                title: "Environment created",
                description: "Environment created",
            });
            router.push(`/projects/${projectName}/${values.name}`);
        },
        [queryClient, code, accessToken, projectName, router]
    );
    return {
        code,
        setCode,
        form,
        onSubmit,
        open,
        onProjectCreated,
    };
};

export default useCreateEnv;
