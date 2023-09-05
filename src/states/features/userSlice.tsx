import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
    id?: string
    registered: boolean
    document: string
    type: string
}

const initialState: User = {
    id: '',
    registered: false,
    document: '',
    type: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserQuery: (state, action) => {
            state.id = action.payload.id;
            state.registered = action.payload.registered;
            state.document = action.payload.document;
            state.type = action.payload.type;
        }
    }
})

export const { setUserQuery } = userSlice.actions;
export const userQuerySelector = (state: RootState) => state.user;
export default userSlice.reducer;