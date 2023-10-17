import {Base} from "@/shared/types/bases";
import type {Quartergraphy} from "@/shared/types/quartergraphy";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {profileApi} from "@/screens/ProfilePage/api";

export type ProfilePageType = "bases" | "quartergraphy";
export type ProfileSortType = "desc" | "asc";

interface ProfileState {
    quartergraphy: Quartergraphy[];
    bases: Base[];
    activePage: ProfilePageType;
    baseRemoveId: null | number;
    sortQuartergraphy: ProfileSortType;
    sortBases: ProfileSortType;
}

const initialState: ProfileState = {
    quartergraphy: [],
    bases: [],
    activePage: "quartergraphy",
    baseRemoveId: null,
    sortBases: "desc",
    sortQuartergraphy: "desc",
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setActivePage: (state, action: PayloadAction<ProfilePageType>) => {
            state.activePage = action.payload;
        },
        removeQuartergraphyById: (state, action: PayloadAction<number>) => {
            state.quartergraphy = state.quartergraphy.filter((q) => q.id !== action.payload);
        },
        removeBaseById: (state, action: PayloadAction<number>) => {
            state.bases = state.bases.filter((b) => b.id !== action.payload);
        },
        setBaseRemoveId: (state, action: PayloadAction<number | null>) => {
            state.baseRemoveId = action.payload;
        },
        sortBases: (state, action: PayloadAction<ProfileSortType>) => {
            state.sortBases = action.payload;
            
            if (action.payload === 'desc') {
                state.bases.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            } else {
                state.bases.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            }
        },
        sortQuartergraphy: (state, action: PayloadAction<ProfileSortType>) => {
            state.sortQuartergraphy = action.payload;
            
            if (action.payload === 'desc') {
                state.quartergraphy.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            } else {
                state.quartergraphy.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(profileApi.endpoints.getProfileQuartergraphy.matchFulfilled, (state, action) => {
                state.quartergraphy = action.payload;
            })
            .addMatcher(profileApi.endpoints.getProfileBases.matchFulfilled, (state, action) => {
                state.bases = action.payload;
            })
            .addMatcher(profileApi.endpoints.deleteBaseById.matchFulfilled, state => {
                state.bases = state.bases.filter(base => base.id !== state.baseRemoveId);
                state.baseRemoveId = null;
            })
            .addMatcher(profileApi.endpoints.updateProfileBases.matchFulfilled, (state, action) => {
                state.bases = action.payload;
            });
    },
});

export const {
    setActivePage,
    removeQuartergraphyById,
    removeBaseById,
    setBaseRemoveId,
    sortQuartergraphy,
    sortBases
} = profileSlice.actions;
