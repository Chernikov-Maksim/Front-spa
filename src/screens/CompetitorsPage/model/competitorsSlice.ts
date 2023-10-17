import { Competitors } from "@/shared/types/competitors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { competitorsApi } from "@/screens/CompetitorsPage/api";

export type CompetitorsPage = "map" | "table";

interface CompetitorsState {
    competitors: Competitors | null;
    page: CompetitorsPage,
}

const initialState: CompetitorsState = {
    competitors: null,
    page: "table",
};

export const competitorsSlice = createSlice({
    name: "competitors",
    initialState,
    reducers: {
        addCompetitorsById: (
            state,
            action: PayloadAction<{
                id: number;
                from: "main_competitors" | "other_competitors";
                to: "main_competitors" | "other_competitors";
            }>
        ) => {
            const { id, from, to } = action.payload;

            if (state.competitors) {
                state.competitors[from] = state.competitors[from].filter((competitor) => {
                    if (competitor.id !== id) {
                        return true;
                    }

                    state.competitors?.[to].push(competitor);

                    return false;
                });
            }
        },
        setCompetitorsPage: (state, action: PayloadAction<CompetitorsPage>) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(competitorsApi.endpoints.getCompetitors.matchFulfilled, (state, action) => {
            state.competitors = action.payload;
        });
    },
});

export const { addCompetitorsById, setCompetitorsPage } = competitorsSlice.actions;
