"use client";
import { Tree, TreeViewElement } from "@/components/ui/file-tree";
import { useEffect, useMemo } from "react";
import RenderTree from "./RenderTree";

import { projectApi } from "@/api/project.api";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import NewProjectFolder from "./NewProjectFolder";
import RenderEnvFile from "./RenderEnvFile";
import RenderCreateEnvFile from "./RenderCreateEnvFile";
import { randomUID } from "@/lib/utils";

const FileTree = () => {
    const { args } = useParams();
    const projectName = args?.[0];
    const envName = args?.[1];
    const { accessToken } = useAuthStore();
    const pathname = usePathname();
    const router = useRouter();
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
    });

    const { isLoading, elements, initialExpandedItems } = useMemo(() => {
        if (isLoadingProjects) {
            return {
                isLoading: true,
                elements: null,
                initialExpandedItems: null,
            };
        }
        const elements = projects?.map((project) => ({
            id: project.id,
            name: project.name,
            isSelectable: true,
            children: [
                ...project.environments!,
                {
                    id: randomUID(),
                    name: "New",
                    isSelectable: true,
                },
            ].map((env) => ({
                id: env.id,
                name: env.name,
                isSelectable: true,
            })),
        })) as TreeViewElement[];

        return {
            isLoading: false,
            elements,
            initialExpandedItems: elements?.reduce(
                (acc, { name, children }) => {
                    acc.push(name);
                    if (children) {
                        acc.push(...children.map((child) => child.name));
                    }
                    return acc;
                },
                [] as string[]
            ),
        };
    }, [projects, isLoadingProjects]);

    const selectedProject = useMemo(() => {
        if (!projectName) return null;
        return (
            projects?.find((project) => project.name === projectName) || null
        );
    }, [projects, projectName]);

    const selectedEnvironment = useMemo(() => {
        if (!envName || !selectedProject) return null;
        return (
            selectedProject?.environments?.find(
                (env) => env.name === envName
            ) || null
        );
    }, [selectedProject, envName]);

    useEffect(() => {
        if (isLoading) return;
        if (!elements?.find((project) => project.name === projectName)) {
            router.push(`/projects`);
        }
    }, [projectName, elements, router, isLoading]);

    useEffect(() => {
        if (isLoading) return;
        if (!projectName || projectName === "new") {
            router.push(`/projects`);
        }
    }, [pathname, router, isLoading, projectName]);

    return (
        <>
            <div className="flex w-1/4 flex-shrink-0 shadow-md shadow-border">
                {isLoading ? (
                    <div className="flex items-center justify-center w-full">
                        <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                ) : (
                    <Tree
                        indicator
                        className="overflow-hidden rounded-md bg-background/30 p-2"
                        initialExpandedItems={initialExpandedItems!}
                        initialSelectedId={selectedEnvironment?.name}
                    >
                        {<RenderTree elements={elements!} />}
                        <NewProjectFolder />
                    </Tree>
                )}
            </div>
            {selectedEnvironment ? (
                <RenderEnvFile environment={selectedEnvironment} />
            ) : (
                projectName && <RenderCreateEnvFile projectName={projectName} />
            )}
        </>
    );
};
export default FileTree;
