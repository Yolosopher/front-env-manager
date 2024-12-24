import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
