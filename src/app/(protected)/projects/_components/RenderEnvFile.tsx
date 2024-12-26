"use client";

import Code from "@/components/ui/code";
import { jsonToEnv } from "@/lib/utils";
import { useMemo } from "react";

type RenderEnvFileProps = {
    environment: Environment | null;
};

const RenderEnvFile = ({ environment }: RenderEnvFileProps) => {
    const { envCode, filename } = useMemo(() => {
        if (!environment) {
            return {
                envCode: "",
                filename: "",
            };
        }
        const envCode = jsonToEnv(environment.variables);
        return {
            envCode,
            filename: environment.name,
        };
    }, [environment]);

    return (
        <div className="w-full h-full overflow-hidden">
            <Code code={envCode} language="dotenv" filename={filename} />
        </div>
    );
};

export default RenderEnvFile;
