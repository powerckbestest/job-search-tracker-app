import { configureStore } from '@reduxjs/toolkit'
import {employersSlice} from "./employers.ts";
import {useDispatch, useSelector} from "react-redux";
import {valuesSlice} from "./values.ts";

export const store = configureStore({
    reducer: {
        [valuesSlice.name]: valuesSlice.reducer,
        [employersSlice.name]: employersSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() //
export const useAppSelector = useSelector.withTypes<RootState>() //
