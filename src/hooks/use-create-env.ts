"use client";

import { newEnvSchema } from "@/app/(protected)/projects/_components/newenv.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useCreateEnv = (projectName: string) => {
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [code, setCode] = useState<string>("");
    const form = useForm<z.infer<typeof newEnvSchema>>({
        resolver: zodResolver(newEnvSchema),
        defaultValues: {
            name: "envrionment name",
        },
    });

    const onProjectCreated = (newProjectId: string) => {
        router.push(`/projects/${newProjectId}`);
    };

    const onSubmit = useCallback(
        async (values: z.infer<typeof newEnvSchema>) => {
            console.log(values);
            setOpen(true);
            // const response = await 

        },
        [setOpen, projectName]
    );
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
