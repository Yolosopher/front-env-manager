import { Folder, File, TreeViewElement } from "@/components/ui/file-tree";
import { redirect } from "next/navigation";

const RenderTree = ({ elements }: { elements: TreeViewElement[] }) => {
    return (
        <>
            {elements?.map(({ children, name: projectName, isSelectable }) => (
                <Folder
                    key={projectName}
                    element={projectName}
                    value={projectName}
                    isSelectable={isSelectable}
                >
                    {!children ? (
                        <File
                            value={projectName}
                            isSelectable={isSelectable}
                            onClick={() => {
                                redirect(`/projects/${projectName}/new`);
                            }}
                        >
                            <p>Create New</p>
                        </File>
                    ) : (
                        children.map(({ name: envName, isSelectable }) => (
                            <File
                                key={envName}
                                value={envName}
                                isSelectable={isSelectable}
                                onClick={() => {
                                redirect(`/projects/${projectName}/${envName}`);
                            }}
                        >
                            <p>{envName}</p>
                            </File>
                        ))
                    )}
                </Folder>
            ))}
        </>
    );
};

export default RenderTree;
