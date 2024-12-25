"use client";

import { Folder } from "@/components/ui/file-tree";
import { FolderPlus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const NewProjectFolder = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <Folder
            element="New Project"
            value="New Project"
            customOpenIcon={<FolderPlus className="h-4 w-4" />}
            customCloseIcon={<FolderPlus className="h-4 w-4" />}
            isSelectable={true}
            isSelect={pathname.includes("new")}
            onClick={() => {
                router.push("/projects/new");
            }}
        />
    );
};

export default NewProjectFolder;
