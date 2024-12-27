"use client";

import { Card } from "@/components/ui/card";
import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";

const InfoUser = () => {
    const router = useRouter();
    const user = useAuthStore((state) => state.auth);

    return (
        <Card
            className="w-full h-full cursor-pointer flex flex-col p-4 col-span-2"
            onClick={() => router.push("/projects")}
        >
            <h1 className="text-2xl font-bold text-primary">{user?.fullName}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
        </Card>
    );
};

export default InfoUser;
