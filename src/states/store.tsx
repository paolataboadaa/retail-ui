import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { userApi } from "./features/apiSlice";
import storageSlice from "./features/storageSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        storage: storageSlice,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
