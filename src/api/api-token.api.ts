import { ApiClient } from ".";

class ApiTokenApi {
    private readonly client: ApiClient;
    constructor() {
        this.client = new ApiClient("/api-token");
    }

    public async findAll(accessToken: string) {
        return this.client.get({ path: "/", accessToken });
    }

    public async generate(data: { name: string }, accessToken: string) {
        return this.client.post({ path: "/", body: data, accessToken });
    }

    public async delete(tokenId: string, accessToken: string) {
        return this.client.delete({ path: `/${tokenId}`, accessToken });
    }
}

export const apiTokenApi = new ApiTokenApi();
