"use client";

import { shikiEnvLanguage } from "@/lib/shikiEnvLanguage";
import { cn } from "@/lib/utils";
import { Copy, DownloadIcon, FileIcon, Trash2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createHighlighter, LanguageInput } from "shiki";
import Confirmation from "../confirmation";
import { Button } from "./button";

interface CodeProps {
    code: string;
    language: string;
    filename: string;
    removeEnvironment: (envId: string) => Promise<void>;
    environmentId: string;
}

export default function Code({
    code,
    language,
    filename,
    removeEnvironment,
    environmentId,
}: CodeProps) {
    const { theme, systemTheme } = useTheme();
    const [highlightedCode, setHighlightedCode] = useState<string>("");

    useEffect(() => {
        async function highlightCode() {
            const highlighter = await createHighlighter({
                themes: ["github-dark"],
                langs: [shikiEnvLanguage as unknown as LanguageInput],
            });
            const codeToHTML = highlighter.codeToHtml(code, {
                lang: language,
                theme: "github-dark",
            });
            setHighlightedCode(codeToHTML);
        }

        highlightCode();
    }, [theme, systemTheme, code, language]);

    const renderCode = (code: string, highlighted: string) => {
        if (highlighted) {
            return (
                <div
                    className="h-full flex-1 overflow-auto bg-background font-mono text-xs [&>pre]:h-full [&>pre]:!bg-transparent [&>pre]:p-4 [&_code]:break-all"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            );
        } else {
            return (
                <pre className="h-full flex-1 overflow-auto break-all bg-background p-4 font-mono text-xs text-foreground">
                    {code}
                </pre>
            );
        }
    };
    return (
        <div className="min-h-full flex flex-col">
            <div className="flex items-center bg-accent p-2 text-sm text-foreground min-h-full flex-shrink-0 flex-grow-0">
                <FileIcon className="mr-2 h-4 w-4" />
                {filename}
                <div className="flex items-center ml-auto gap-2">
                    <Confirmation
                        title="Delete Environment"
                        description="Are you sure you want to delete this environment?"
                        onConfirm={() => {
                            removeEnvironment(environmentId);
                        }}
                        triggerContent={
                            <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        }
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            navigator.clipboard.writeText(code);
                        }}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            // Create a Blob for the file content
                            const blob = new Blob([code], {
                                type: "application/x-env",
                            });
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            // Use "./" to preserve the leading dot in the filename
                            a.download = filename;
                            a.click();
                            window.URL.revokeObjectURL(url);
                        }}
                    >
                        <DownloadIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div
                className={cn(
                    "flex-1 flex flex-col items-stretch w-full h-full cursor-text",
                    "dark"
                )}
            >
                {renderCode(code, highlightedCode)}
            </div>
        </div>
    );
}
