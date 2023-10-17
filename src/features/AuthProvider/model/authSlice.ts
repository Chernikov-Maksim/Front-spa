import { authApi } from "@/features/AuthProvider/api";
import { User } from "@/shared/types/user";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface authStateProps {
    user: User | null;
    isAuthenticated: boolean;
}

const initialState: authStateProps = {
    user: null,
    isAuthenticated: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;

            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");

            window.location.reload();
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.getCurrentUser.matchPending, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addMatcher(authApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addMatcher(authApi.endpoints.getCurrentUser.matchRejected, (state, action) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { logout } = authSlice.actions;
