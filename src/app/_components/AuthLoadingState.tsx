"use client";

import { Card } from "@/components/ui/card";
import RetroGrid from "@/components/ui/retro-grid";
import useAuthStore from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

const AuthLoadingState = () => {
    const { authLoading } = useAuthStore();

    if (authLoading) {
        return (
            <div className="flex w-full h-screen fixed top-0 left-0 bg-background z-50">
                <div className="absolute w-full h-full top-0 right-0 bg-primary/10 z-10"></div>
                <div className="flex gap-4 p-6 px-6 w-full h-full items-center justify-center ">
                    <Card className="rounded-lg w-full h-full max-w-2xl max-h-[24rem] relative overflow-hidden z-20">
                        <div className="flex flex-col gap-8 items-center justify-center">
                            <div className="text-xl px-7 flex items-center justify-center text-center text-primary-foreground w-full h-40 font-black uppercase bg-card relative z-30 text-gray-400">
                                <p className="flex gap-[4px] items-end">
                                    <span>Getting your profile</span>
                                    <span className="inline-flex justify-center items-center space-x-2 mb-[5px]">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-dot-flash"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-dot-flash delay-200"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-dot-flash delay-400"></span>
                                    </span>
                                </p>
                            </div>
                            <Loader2 className="size-10 animate-spin text-gray-400" />
                        </div>
                        <RetroGrid />
                    </Card>
                </div>
            </div>
        );
    }

    return null;
};

export default AuthLoadingState;
