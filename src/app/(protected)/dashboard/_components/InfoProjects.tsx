"use client";

import { projectApi } from "@/api/project.api";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const InfoProjects = () => {
    const router = useRouter();
    const accessToken = useAuthStore((state) => state.accessToken!);

    const { data: projects, isLoading: isLoadingProjects } = useQuery<
        Project[]
    >({
        queryKey: ["projects"],
        queryFn: async () => {
            const response = await projectApi.getProjects(accessToken!);
            if (response.error) {
                toast({
                    title: "Error",
                    description: response.error,
                    variant: "destructive",
                });
                throw new Error(response.error);
            }
            return (response.data.data || []) as Project[];
        },
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 1, // 1 min
    });

    const totalProjects = useMemo(() => {
        return projects?.length || 0;
    }, [projects]);

    return (
        <Card
            className="w-full h-full cursor-pointer flex items-center justify-center p-0"
            onClick={() => router.push("/projects")}
        >
            <CardContent className="flex w-full items-center justify-center gap-2 p-4">
                <CardTitle>Projects:</CardTitle>
                {isLoadingProjects ? (
                    <Skeleton className="w-full h-full bg-secondary rounded-md p-4 " />
                ) : (
                    <p>{totalProjects}</p>
                )}
            </CardContent>
        </Card>
    );
};

export default InfoProjects;
