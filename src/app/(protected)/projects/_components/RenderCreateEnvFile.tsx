"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateEnv from "@/hooks/use-create-env";
import { Editor } from "@shikitor/react";
import "@shikitor/react/index.css";
import { Copy, FileIcon, SaveIcon } from "lucide-react";
import "./shikicustom.css";

const RenderCreateEnvFile = () => {
    const { form, onSubmit, code, setCode } = useCreateEnv();

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full h-full overflow-hidden dark"
                >
                    <div className="min-h-full flex flex-col">
                        <div className="flex items-center bg-accent p-2 text-sm text-foreground min-h-full flex-shrink-0 flex-grow-0">
                            <FileIcon className="mr-2 h-4 w-4" />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="filename.env"
                                                className="min-w-48 focus-visible:ring-0 text-sm font-inherit px-0"
                                                autoFocus
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center ml-auto gap-2">
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
                                        console.log(code);
                                    }}
                                >
                                    <SaveIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-stretch w-full h-full overflow-auto">
                            <Editor
                                className="w-full h-full flex-1 self-stretch 
                            !bg-transparent EDITOR-CLASSNAME"
                                style={{
                                    fontSize: "12px",
                                    fontFamily: "monospace",
                                    cursor: "none",
                                    overflow: "auto",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                options={{
                                    language: "dotenv",
                                    theme: "github-dark",
                                    lineNumbers: "on",
                                }}
                                value={code}
                                onChange={(value) => {
                                    setCode(value);
                                }}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default RenderCreateEnvFile;
