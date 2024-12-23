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
