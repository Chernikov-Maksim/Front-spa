export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}

export interface UserRole {
    id: number;
    code: string;
    created_at: Date;
    updated_at: Date;
}
