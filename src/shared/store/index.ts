import { authSlice } from "@/features/AuthProvider/model/authSlice";
import { api, selfApi } from "@/shared/store/api";
import { combineReducers, configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";

import { competitorsSlice } from "@/screens/CompetitorsPage/model/competitorsSlice";
import { profileSlice } from "@/screens/ProfilePage/model/profileSlice";
import { quartergraphySlice } from "@/screens/QuartergraphyPage/model/quartergraphySlice";

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    [selfApi.reducerPath]: selfApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [competitorsSlice.name]: competitorsSlice.reducer,
    [quartergraphySlice.name]: quartergraphySlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
});

export const setupStore = (options?: ConfigureStoreOptions["preloadedState"] | undefined) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, selfApi.middleware),
        ...options,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
