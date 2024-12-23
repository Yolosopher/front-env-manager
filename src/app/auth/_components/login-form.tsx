"use client";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "./auth.validations";
import useAuth from "@/hooks/use-auth";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { login } = useAuth();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        login(values);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="m@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    href="#"
                                                    className="text-sm text-muted-foreground hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="********"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Login with Github
                                </Button>
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/auth/signup"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
