"use client";

import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth-store";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const GetStartedButton = () => {
    const { auth } = useAuthStore();
    return (
        <Link href={auth?.id ? "/dashboard" : "/auth/login"}>
            <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </Link>
    );
};

export default GetStartedButton;
