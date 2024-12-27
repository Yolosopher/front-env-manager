"use client";
import { apiTokenApi } from "@/api/api-token.api";
import Confirmation from "@/components/confirmation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ScratchToReveal from "@/components/ui/scratch-to-reveal";
import ScriptCopyBtn from "@/components/ui/script-copy-btn";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useCallback, useState } from "react";

type TokenItemProps = {
    token: ApiToken;
    width: number;
};

const TokenItem = ({ token, width }: TokenItemProps) => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const queryClient = useQueryClient();
    const [isScratched, setIsScratched] = useState<boolean>(false);
    const handleComplete = () => {
        setIsScratched(true);
    };

    const handleDelete = useCallback(async () => {
        if (!accessToken) return;

        const response = await apiTokenApi.delete(token.id, accessToken);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            toast({
                title: "Success",
                description: "API token deleted",
            });
            queryClient.invalidateQueries({
                queryKey: ["api-tokens"],
            });
        }
    }, [accessToken, queryClient, token.id]);

    return (
        <Card className="flex flex-col gap-2 p-4">
            {isScratched ? (
                <div className="flex items-center justify-center overflow-hidden rounded-2xl border-2 fonts">
                    <ScriptCopyBtn
                        showMultiplePackageOptions={false}
                        codeLanguage="bash"
                        lightTheme="github-light"
                        darkTheme="github-dark"
                        className="w-full text-xs"
                        command={token.apiToken}
                    />
                </div>
            ) : (
                <Card className="flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2">
                    <ScratchToReveal
                        width={width}
                        height={36}
                        minScratchPercentage={90}
                        className="flex items-center justify-center overflow-hidden rounded-2xl border-2"
                        onComplete={handleComplete}
                        gradientColors={["#6E44FF", "#FF4D9B", "#1A1A40"]}
                    >
                        <div></div>
                    </ScratchToReveal>
                </Card>
            )}
            <div className="flex items-end justify-end gap-4">
                <h2 className="text-2xl font-medium tracking-tight text-muted-foreground capitalize flex items-center gap-2 leading-none">
                    <span className="text-primary font-semibold">
                        {token.name}
                    </span>
                </h2>
                <Confirmation
                    title="Delete API Token"
                    description="Are you sure you want to delete this API token?"
                    onConfirm={handleDelete}
                    triggerContent={
                        <Button
                            variant="destructive"
                            className="size-7"
                            size={"icon"}
                        >
                            <Trash2 className="size-4 text-xs" />
                        </Button>
                    }
                />
            </div>
        </Card>
    );
};

export default TokenItem;
