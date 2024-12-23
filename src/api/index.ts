export class ApiClient {
    private readonly baseUrl: string;
    private readonly route: string;
    constructor(route: string) {
        this.baseUrl = process.env.NEXT_PUBLIC_API_URL as string;
        this.route = route;
    }
    private getUrl(path: string) {
        return `${this.baseUrl}${this.route}${path}`;
    }

    public async get({
        headers,
        params = {},
        path = "",
        accessToken,
    }: {
        path: string;
        headers?: HeadersInit;
        params?: Record<string, string>;
        accessToken?: string;
    }) {
        let errorMessage = "An error occurred while fetching data";
        let statusCode = 200;
        try {
            const queryParams = params ? new URLSearchParams(params) : null;
            const url = `${this.getUrl(path)}${
                queryParams ? `?${queryParams.toString()}` : ""
            }`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            });
            statusCode = response.status;

            const data = await response.json();
            if (!response.ok) {
                errorMessage = data.message;
                throw new Error(errorMessage);
            }
            return {
                data,
                status: statusCode,
            };
        } catch (error) {
            console.error(error);
            return {
                error: errorMessage,
                status: statusCode,
            };
        }
    }

    public async post({
        path,
        body,
        headers = {},
        accessToken,
    }: {
        path: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: Record<string, any>;
        headers?: HeadersInit;
        accessToken?: string;
    }) {
        let errorMessage = "An error occurred while fetching data";
        let statusCode = 200;
        try {
            const response = await fetch(this.getUrl(path), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
                body: JSON.stringify(body),
            });
            statusCode = response.status;

            const data = await response.json();
            if (!response.ok) {
                errorMessage = data.message;
                throw new Error(errorMessage);
            }
            return {
                data,
                status: statusCode,
            };
        } catch (error) {
            console.error(error);
            return {
                error: errorMessage,
                status: statusCode,
            };
        }
    }

    public async put({
        path,
        body,
        headers = {},
        accessToken,
    }: {
        path: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        body: Record<string, any>;
        headers?: HeadersInit;
        accessToken?: string;
    }) {
        let errorMessage = "An error occurred while updating data";
        let statusCode = 200;
        try {
            const response = await fetch(this.getUrl(path), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
                body: JSON.stringify(body),
            });
            statusCode = response.status;

            const data = await response.json();
            if (!response.ok) {
                errorMessage = data.message;
                throw new Error(errorMessage);
            }
            return {
                data,
                status: statusCode,
            };
        } catch (error) {
            console.error(error);
            return {
                error: errorMessage,
                status: statusCode,
            };
        }
    }

    public async delete({
        path,
        headers = {},
        accessToken,
    }: {
        path: string;
        headers?: HeadersInit;
        accessToken?: string;
    }) {
        let errorMessage = "An error occurred while deleting data";
        let statusCode = 200;
        try {
            const response = await fetch(this.getUrl(path), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    ...(accessToken && {
                        Authorization: `Bearer ${accessToken}`,
                    }),
                },
            });
            statusCode = response.status;

            const data = await response.json();
            if (!response.ok) {
                errorMessage = data.message;
                throw new Error(errorMessage);
            }
            return {
                data,
                status: statusCode,
            };
        } catch (error) {
            console.error(error);
            return {
                error: errorMessage,
                status: statusCode,
            };
        }
    }
}
