import {routes} from "@/shared/constants/routes";
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import {Mutex} from 'async-mutex'
import {logout} from "@/features/AuthProvider/model/authSlice";


const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.BASE_API_URL,
    prepareHeaders: (headers) => {
        if (!headers.get("Authorization")) {
            headers.set("Authorization", `Bearer ${Cookies.get("accessToken")}`);
        }
        
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    apiInstance,
    extraOptions
) => {
    await mutex.waitForUnlock()
    let result = await baseQuery(args, apiInstance, extraOptions);
    
    console.log(result);
    // @ts-ignore
    if (result.error && result.error.status === 401 && result.error.data?.message === "Expired token") {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            
            const headers = new Headers(result.meta?.request.headers);
            headers.set("authorization", `Bearer ${Cookies.get("refreshToken")}`);
            
            try {
                const refreshResult = await baseQuery(
                    {
                        url: routes.api.refresh,
                        headers: headers,
                    },
                    apiInstance,
                    extraOptions
                );
                
                console.log("refreshResult", refreshResult)
                
                if (refreshResult.data) {
                    // @ts-ignore
                    Cookies.set("accessToken", refreshResult.data.accessToken);
                    // @ts-ignore
                    Cookies.set("refreshToken", refreshResult.data.refreshToken);
                    
                    result = await baseQuery(args, apiInstance, extraOptions);
                } else {
                    // apiInstance.dispatch(logout());
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, apiInstance, extraOptions)
        }
    }
    
    return result;
};

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Cities", "Auth", "Competitors", "Login"],
    endpoints: () => ({}),
});

export const selfApi = createApi({
    reducerPath: "selfApi",
    baseQuery: fetchBaseQuery({baseUrl: process.env.BASE_NEXT_API_URL}),
    tagTypes: ["Dadata"],
    endpoints: () => ({}),
});
