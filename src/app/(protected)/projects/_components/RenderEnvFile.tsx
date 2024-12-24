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
        console.log("envCode", envCode);
        return {
            envCode,
            filename: `.env.${environment.name}`,
        };
    }, [environment]);

    console.log(envCode);

    return (
        <div className="w-full h-full overflow-hidden">
            <Code code={envCode} language="dotenv" filename={filename} />
        </div>
    );
};

export default RenderEnvFile;
