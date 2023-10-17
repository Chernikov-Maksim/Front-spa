import { routes } from "@/shared/constants/routes";
import { api } from "@/shared/store/api";
import { Base } from "@/shared/types/bases";
import { Quartergraphy } from "@/shared/types/quartergraphy";

export const profileApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProfileQuartergraphy: build.query<Quartergraphy[], void>({
            query: () => ({
                url: routes.api.profileQuartergraphy,
            }),
        }),
        getProfileBases: build.query<Base[], void>({
            query: () => ({
                url: routes.api.bases,
            }),
        }),
        updateProfileBases: build.mutation<Base[], void>({
            query: () => ({
                url: routes.api.bases,
            }),
        }),
        deleteQuartergraphyById: build.mutation<{ success: boolean }, number>({
            query: (body) => ({
                url: routes.api.quartergraphy + `/${body}`,
                method: "DELETE",
            }),
        }),
        deleteBaseById: build.mutation<{ success: boolean }, number>({
            query: (body) => ({
                url: routes.api.base + `/${body}`,
                method: "DELETE",
            }),
        }),
        uploadBase: build.mutation<any, FormData>({
            query: (body) => ({
                url: routes.api.uploadBase,
                method: "POST",
                body: body,
            }),
        }),
    }),
});

export const {
    useGetProfileQuartergraphyQuery,
    useGetProfileBasesQuery,
    useDeleteQuartergraphyByIdMutation,
    useDeleteBaseByIdMutation,
    useUploadBaseMutation,
    useUpdateProfileBasesMutation
} = profileApi;
