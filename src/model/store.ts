import { configureStore } from '@reduxjs/toolkit'
import {employersSlice} from "./employers.ts";

export const store = configureStore({
    reducer: {
        [employersSlice.name]: employersSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
