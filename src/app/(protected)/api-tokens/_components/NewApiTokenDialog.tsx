"use client";
import { apiTokenApi } from "@/api/api-token.api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const apiTokenSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

type NewApiTokenDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const NewApiTokenDialog = ({ open, onOpenChange }: NewApiTokenDialogProps) => {
    const queryClient = useQueryClient();
    const { accessToken } = useAuthStore();
    const form = useForm<z.infer<typeof apiTokenSchema>>({
        resolver: zodResolver(apiTokenSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof apiTokenSchema>) => {
        const response = await apiTokenApi.generate(values, accessToken!);
        if (response.error) {
            toast({
                title: "Error",
                description: response.error,
                variant: "destructive",
            });
        } else {
            form.reset();
            toast({
                title: "Success",
                description: "API Token generated successfully",
                duration: 3000,
            });
            await queryClient.invalidateQueries({ queryKey: ["api-tokens"] });
            onOpenChange(false);
        }
    };

    useEffect(() => {
        console.log("running", open);
        if (!open) {
            form.reset();
        }
    }, [form, open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate API Token</DialogTitle>
                    <DialogDescription>
                        Create a new API token
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id="api-token-create-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Token Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="My API Token"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="api-token-create-form">
                        Generate Token
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default NewApiTokenDialog;
