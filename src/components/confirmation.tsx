"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type ConfirmationProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    triggerContent?: React.ReactNode;
};

const Confirmation = ({
    title,
    description,
    onConfirm,
    onCancel,
    triggerContent,
}: ConfirmationProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {triggerContent || <Button variant="outline">{title}</Button>}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel || undefined}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Confirmation;
