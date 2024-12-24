import { ApiClient } from ".";

class ProjectApi {
    private readonly client: ApiClient;
    constructor() {
        this.client = new ApiClient("/project");
    }

    public async getProjects(accessToken: string) {
        return this.client.get({ path: "/", accessToken });
    }

    public async createProject(data: { name: string }, accessToken: string) {
        return this.client.post({ path: "/", body: data, accessToken });
    }

    public async deleteProject(projectId: string, accessToken: string) {
        return this.client.delete({ path: `/${projectId}`, accessToken });
    }
}

export const projectApi = new ProjectApi();
