import { ApiClient } from ".";

class EnvironmentApi {
    private readonly client: ApiClient;
    constructor() {
        this.client = new ApiClient("/environment");
    }

    public async findAllByProjectId(projectId: string, accessToken: string) {
        return this.client.get({ path: `/${projectId}`, accessToken });
    }

    public async getOneByEnvironmentId(
        environmentId: string,
        accessToken: string
    ) {
        return this.client.get({
            path: `/environment/single/${environmentId}`,
            accessToken,
        });
    }

    public async create(
        projectId: string,
        data: {
            name: string;
            projectId: string;
            variables: Record<string, string>;
        },
        accessToken: string
    ) {
        return this.client.post({
            path: "/",
            body: data,
            accessToken,
        });
    }

    public async delete(environmentId: string, accessToken: string) {
        return this.client.delete({
            path: `/${environmentId}`,
            accessToken,
        });
    }
}

export const environmentApi = new EnvironmentApi();
