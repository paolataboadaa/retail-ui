import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface State {
    updated: boolean
}

const initialState: State = {
    updated: false
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        onUpdate: (state, action) => {
            state.updated = action.payload;
        }
    }
})

export const { onUpdate } = storageSlice.actions;
export const storageSelector = (state: RootState) => state.storage;
export default storageSlice.reducer;