"use client";

import { DownloadIcon, FileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { createHighlighter, LanguageInput } from "shiki";
import { shikiEnvLanguage } from "@/lib/shikiEnvLanguage";
import { Button } from "./button";

interface CodeProps {
    code: string;
    language: string;
    filename: string;
}

export default function Code({ code, language, filename }: CodeProps) {
    const { theme, systemTheme } = useTheme();
    const [highlightedCode, setHighlightedCode] = useState<string>("");

    useEffect(() => {
        async function highlightCode() {
            const highlighter = await createHighlighter({
                themes: ["github-dark", "github-light"],
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
                <Button
                    variant="ghost"
                    size="icon"
                    className={"ml-auto"}
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
                        console.log(a.download);
                        a.click();
                        window.URL.revokeObjectURL(url);
                    }}
                >
                    <DownloadIcon className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex-1 flex flex-col items-stretch w-full h-full">
                {renderCode(code, highlightedCode)}
            </div>
        </div>
    );
}
