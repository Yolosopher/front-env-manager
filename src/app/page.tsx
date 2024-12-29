import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FileKey, Key, Lock } from "lucide-react";
import GetStartedButton from "./_components/GetStartedButton";
import { HEADER_HEIGHT } from "@/config/styles";

export default function HomePage() {
    return (
        <div
            className="flex min-h-[calc(100vh-59px)] flex-col items-center justify-center p-6 text-center"
            style={{ paddingBottom: `calc(4dvh + ${HEADER_HEIGHT}px)` }}
        >
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-8">
                <h1 className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                    Manage Environment Variables with Confidence
                </h1>

                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Securely organize and control environment variables across
                    multiple projects and environments. Built for developers who
                    value security and efficiency.
                </p>

                <div className="flex gap-4">
                    <GetStartedButton />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Lock className="h-5 w-5" />
                                Secure Storage
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Your environment variables are encrypted and
                                stored securely with industry-standard
                                practices.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <Key className="h-5 w-5" />
                                API Tokens
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Generate and manage API tokens for secure
                                programmatic access to your environments.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-center gap-2">
                                <FileKey className="h-5 w-5" />
                                Multiple Projects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Organize environment variables across different
                                projects and environments with ease.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
