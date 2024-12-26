"use client";
import { projectApi } from "@/api/project.api";
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
import { projectCreateSchema } from "./newenv.validations";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type ProjectCreateDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const ProjectCreateDialog = ({
    open,
    onOpenChange,
}: ProjectCreateDialogProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { accessToken } = useAuthStore();
    const form = useForm<z.infer<typeof projectCreateSchema>>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof projectCreateSchema>) => {
        const response = await projectApi.createProject(values, accessToken!);
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
                description: "Project created successfully",
                duration: 3000,
            });
            await queryClient.invalidateQueries({ queryKey: ["projects"] });
            router.push(`/projects/${response.data.name}`);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>Create a new project</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        id="project-create-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button type="submit" form="project-create-form">
                        Create Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectCreateDialog;
