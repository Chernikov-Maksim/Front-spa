import { LoginRequestArgs, LoginResponse } from "./types";
import { routes } from "@/shared/constants/routes";
import { api } from "@/shared/store/api";
import { Credential } from "@/shared/types/credential";
import { User } from "@/shared/types/user";

export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCurrentUser: build.query<User, void>({
            query: () => ({
                url: routes.api.user,
            }),
            providesTags: ["Auth"],
        }),
        login: build.mutation<LoginResponse, Credential>({
            query: (body) => ({
                url: routes.api.login,
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Login"],
        }),
    }),
});

export const { useGetCurrentUserQuery, useLoginMutation } = authApi;
