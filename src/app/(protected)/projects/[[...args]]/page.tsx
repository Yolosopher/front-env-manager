import { MagicCard } from "@/components/ui/magic-card";
import { HEADER_HEIGHT } from "@/config/styles";
import { cn } from "@/lib/utils";
import FileTree from "../_components/FileTree";

const ProjectsPage = async () => {
    return (
        <div
            style={{
                height: `calc(96dvh - ${HEADER_HEIGHT}px)`,
            }}
            className={cn("flex w-full items-center justify-center p-6")}
        >
            <MagicCard
                gradientSize={1400}
                className="cursor-pointer justify-center shadow-2xl whitespace-nowrap text-4xl !bg-background w-full"
                gradientColor={"hsl(var(--primary))"}
                gradientOpacity={0.1}
            >
                <div className="flex flex-1 w-full h-full cursor-default">
                    <FileTree />
                </div>
            </MagicCard>
        </div>
    );
};

export default ProjectsPage;
