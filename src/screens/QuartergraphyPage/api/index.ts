import { routes } from "@/shared/constants/routes";
import { api } from "@/shared/store/api";
import { QuartergraphyResponse, QuartergraphyType } from "@/shared/types/quartergraphy";

import { CalculateQuartergraphyRequestArgs } from "@/screens/QuartergraphyPage/api/types";

export const quartergraphyApi = api.injectEndpoints({
    endpoints: (build) => ({
        calculateQuartergraphy: build.query<QuartergraphyResponse, CalculateQuartergraphyRequestArgs>({
            query: (body) => {
                if (body.id) {
                    return {
                        url: routes.api.quartergraphy + `/${body.id}`,
                    };
                } else {
                    return {
                        url: routes.api.calculate,
                        method: "POST",
                        body: body,
                    };
                }
            },
        }),
        exportQuartergraphy: build.mutation<{ file_path: string }, { type: QuartergraphyType; apt_graph_id: number }>({
            query: (body) => ({
                url: routes.api.quartergraphyExport,
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const { useCalculateQuartergraphyQuery, useExportQuartergraphyMutation } = quartergraphyApi;
