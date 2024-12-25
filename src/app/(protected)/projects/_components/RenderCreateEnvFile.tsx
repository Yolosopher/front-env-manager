"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreateEnv from "@/hooks/use-create-env";
import { FileIcon, SaveIcon } from "lucide-react";

const RenderCreateEnvFile = () => {
    const { envName, setEnvName, code, setCode } = useCreateEnv();
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="min-h-full flex flex-col">
                <div className="flex items-center bg-accent p-2 text-sm text-foreground min-h-full flex-shrink-0 flex-grow-0">
                    <FileIcon className="mr-2 h-4 w-4" />
                    <Input
                        placeholder="filename.env"
                        value={envName}
                        className="min-w-48 focus-visible:ring-0 text-sm font-inherit px-0"
                        onChange={(e) => setEnvName(e.target.value)}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className={"ml-auto"}
                        onClick={() => {
                            console.log(code);
                        }}
                    >
                        <SaveIcon className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 flex flex-col items-stretch w-full h-full">
                    {/* {renderCode(code, highlightedCode)} */}
                </div>
            </div>
        </div>
    );
};

export default RenderCreateEnvFile;
