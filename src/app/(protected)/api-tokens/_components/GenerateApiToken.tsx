"use client";

import ShimmerButton from "@/components/ui/shimmer-button";
import { useState } from "react";
import NewApiTokenDialog from "./NewApiTokenDialog";

const GenerateApiToken = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className="flex justify-center">
                <ShimmerButton
                    onClick={() => setOpen(true)}
                    className="shadow-2xl"
                    background="hsl(var(--primary) / 0.99)"
                >
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-primary-foreground">
                        Generate new API Token
                    </span>
                </ShimmerButton>
            </div>
            <NewApiTokenDialog open={open} onOpenChange={setOpen} />
        </>
    );
};

export default GenerateApiToken;
