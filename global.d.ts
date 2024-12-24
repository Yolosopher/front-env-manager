type AuthState = {
    id: string;
    email: string;
    fullName: string;
    provider: string | null;
    providerId: string | null;
    avatar: string | null;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};

type Environment = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    variables: {
        [key: string]: string | number;
    };
};

type Project = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    environments: Environment[];
};
