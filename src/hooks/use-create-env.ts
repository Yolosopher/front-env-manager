"use client";

import { useState } from "react";

const useCreateEnv = () => {
    const [envName, setEnvName] = useState<string>("");
    const [code, setCode] = useState<string>("");

    return { envName, setEnvName, code, setCode };
};

export default useCreateEnv;
