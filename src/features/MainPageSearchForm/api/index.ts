import { routes } from "@/shared/constants/routes";
import { api, selfApi } from "@/shared/store/api";
import type { CityWithDates } from "@/shared/types/city";
import Cookies from "js-cookie";

export const citiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllCities: build.query<CityWithDates[], void>({
            query: () => ({
                url: routes.api.cities,
            }),
            providesTags: ["Cities"],
        }),
    }),
});

export const dadataApi = selfApi.injectEndpoints({
    endpoints: (build) => ({
        getAddressSuggestion: build.query<
            { data: string; success: boolean },
            string
        >({
            query: (queryString) => ({
                url: routes.endpoints.city,
                params: {
                    q: queryString,
                },
            }),
            providesTags: ["Dadata"],
        }),
    }),
});

export const { useGetAllCitiesQuery } = citiesApi;
export const { useGetAddressSuggestionQuery } = dadataApi;
