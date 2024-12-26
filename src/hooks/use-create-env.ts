"use client";

import { newEnvSchema } from "@/app/(protected)/projects/_components/newenv.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useCreateEnv = () => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const form = useForm<z.infer<typeof newEnvSchema>>({
        resolver: zodResolver(newEnvSchema),
        defaultValues: {
            name: "filename.env",
        },
    });

    const onProjectCreated = (newProjectId: string) => {
        router.push(`/projects/${newProjectId}`);
    };

    const onSubmit = (values: z.infer<typeof newEnvSchema>) => {
        console.log(values);
        setOpen(true);
    };
    return {
        code,
        setCode,
        form,
        onSubmit,
        open,
        setOpen,
        onProjectCreated,
    };
};

export default useCreateEnv;
