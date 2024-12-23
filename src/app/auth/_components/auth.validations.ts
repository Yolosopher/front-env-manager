import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters." }),
});

export const signupSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        fullName: z
            .string()
            .min(2, { message: "Full name must be at least 2 characters." }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters." }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters." }),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });
