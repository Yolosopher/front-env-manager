"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { HTMLAttributes, useEffect, useState } from "react";
import { codeToHtml } from "shiki";

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
    showMultiplePackageOptions?: boolean;
    codeLanguage: string;
    lightTheme: string;
    darkTheme: string;
    command: string;
    className?: string;
}

export default function ScriptCopyBtn({
    codeLanguage,
    lightTheme,
    darkTheme,
    command,
    className,
}: ScriptCopyBtnProps) {
    const [copied, setCopied] = useState(false);
    const [highlightedCode, setHighlightedCode] = useState("");
    const { theme } = useTheme();

    useEffect(() => {
        async function loadHighlightedCode() {
            try {
                const highlighted = await codeToHtml(command, {
                    lang: codeLanguage,
                    themes: {
                        light: lightTheme,
                        dark: darkTheme,
                    },
                    defaultColor: theme === "dark" ? "dark" : "light",
                });
                setHighlightedCode(highlighted);
            } catch (error) {
                console.error("Error highlighting code:", error);
                setHighlightedCode(`<pre>${command}</pre>`);
            }
        }

        loadHighlightedCode();
    }, [command, theme, codeLanguage, lightTheme, darkTheme]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="w-full pl-1">
                <div className=" flex items-center justify-between"></div>
                <div className="relative flex items-center">
                    <div className="min-w-[300px] grow font-mono">
                        {highlightedCode ? (
                            <div
                                className={`[&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono [&>pre::-webkit-scrollbar]:hidden [&>pre]:scrollbar-none ${
                                    theme === "dark" ? "dark" : "light"
                                }`}
                                dangerouslySetInnerHTML={{
                                    __html: highlightedCode,
                                }}
                            />
                        ) : (
                            <pre className="rounded-md border border-border p-2 px-4 font-mono scrollbar-none">
                                {command}
                            </pre>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="relative ml-2 rounded-md"
                        onClick={copyToClipboard}
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                    >
                        <span className="sr-only">
                            {copied ? "Copied" : "Copy"}
                        </span>
                        <Copy
                            className={`h-4 w-4 transition-all duration-300 ${
                                copied ? "scale-0" : "scale-100"
                            }`}
                        />
                        <Check
                            className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                                copied ? "scale-100" : "scale-0"
                            }`}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}
