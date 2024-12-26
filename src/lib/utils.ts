import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
type EnvJson = Record<string, string | number>;

export function jsonToEnv(json: EnvJson): string {
    return Object.entries(json)
        .map(([key, value]) => {
            return `${key}=${value}\n`;
        })
        .join("");
}

export function randomUID(): string {
    return uuidv4();
}

export function parseEnvString(envString: string): Record<string, string> {
    const result: Record<string, string> = {};

    envString.split("\n").forEach((line) => {
        // Remove comments and trim whitespace
        const cleanedLine = line.trim();
        if (!cleanedLine || cleanedLine.startsWith("#")) {
            return; // Ignore empty lines or comments
        }

        // Split key and value
        const [key, ...valueParts] = cleanedLine.split("=");
        const keyTrimmed = key.trim();
        const value = valueParts.join("=").trim(); // Handle cases with '=' in the value

        // Remove quotes if present
        const unquotedValue = value.replace(/^["']|["']$/g, "");

        result[keyTrimmed] = unquotedValue;
    });

    return result;
}
