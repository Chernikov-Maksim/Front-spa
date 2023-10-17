import { routes } from "@/shared/constants/routes";
import { api } from "@/shared/store/api";
import type { Competitors } from "@/shared/types/competitors";

import { CompetitorsRequestArgs } from "@/screens/CompetitorsPage/api/types";

export const competitorsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCompetitors: build.query<Competitors, CompetitorsRequestArgs>({
            query: (body) => {
                if (body.id) {
                    return {
                        url: routes.api.quartergraphy + `/${body.id}/competitors?address=${body.address}`,
                    };
                } else {
                    return {
                        url: routes.api.competitors,
                        method: "POST",
                        body: body,
                    };
                }
            },
            providesTags: ["Competitors"],
        }),
        exportCompetitors: build.mutation<{ file_path: string }, { competitors_ids: number[] }>({
            query: (body) => ({
                url: routes.api.competitorsExport,
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const { useGetCompetitorsQuery, useExportCompetitorsMutation } = competitorsApi;
