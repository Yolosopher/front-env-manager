import { z } from "zod";

export const newEnvSchema = z.object({
    name: z.string().min(1, { message: "Environment name is required" }),
});

export const projectCreateSchema = z.object({
    name: z.string().min(1, { message: "Project name is required" }),
});
