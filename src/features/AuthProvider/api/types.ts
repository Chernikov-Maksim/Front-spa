export interface LoginRequestArgs {
    email: string;
    password: string;
}

export interface LoginResponse {
    statusCode: number;
    message: string;
    accessToken: string;
    refreshToken: string;
}
