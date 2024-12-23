import {
    loginSchema,
    signupSchema,
} from "@/app/auth/_components/auth.validations";
import { ApiClient } from ".";
import { z } from "zod";

class AuthApi {
    private readonly client: ApiClient;
    constructor() {
        this.client = new ApiClient("/auth");
    }

    public async getProfile(accessToken: string) {
        return this.client.get({ path: "/profile", accessToken });
    }

    public async signup(
        data: Omit<z.infer<typeof signupSchema>, "confirmPassword">
    ) {
        return this.client.post({ path: "/register", body: data });
    }

    public async githubAuth() {
        return this.client.get({ path: "/github" });
    }

    public async login(data: z.infer<typeof loginSchema>) {
        return this.client.post({ path: "/login", body: data });
    }

    public async logout(accessToken: string) {
        return this.client.get({ path: "/logout", accessToken });
    }
}

export const authApi = new AuthApi();
