import { QuartergraphyType } from "@/shared/types/quartergraphy";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuartergraphySliceProps {
    type: QuartergraphyType;
}

const initialState: QuartergraphySliceProps = {
    type: "market",
};

export const quartergraphySlice = createSlice({
    name: "quartergraphy",
    initialState,
    reducers: {
        setQuartergraphyType: (state, action: PayloadAction<QuartergraphyType>) => {
            state.type = action.payload;
        },
    },
});

export const { setQuartergraphyType } = quartergraphySlice.actions;
