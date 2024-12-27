"use client";

import { Folder } from "@/components/ui/file-tree";
import { FolderPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ProjectCreateDialog from "./ProjectCreateDialog";

const NewProjectFolder = () => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Folder
                element="New Project"
                value="New Project"
                customOpenIcon={<FolderPlus className="h-4 w-4" />}
                customCloseIcon={<FolderPlus className="h-4 w-4" />}
                isSelectable={true}
                isSelect={pathname.includes("new")}
                onClick={() => {
                    setIsOpen(true);
                }}
            />

            <ProjectCreateDialog open={isOpen} onOpenChange={setIsOpen} />
        </>
    );
};

export default NewProjectFolder;
