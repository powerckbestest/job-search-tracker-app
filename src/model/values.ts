import {createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store.ts";


type Values = {
    editingEmployerId: string | null;
    editingEmployerInterviewId: string | null;
    isAdding: boolean;
}

const initialValues: Values = {
    editingEmployerId: null,
    editingEmployerInterviewId: null,
    isAdding: false,
}

export const valuesSlice = createSlice({
    name: 'values',
    initialState: initialValues,
    reducers: {
        setEditingEmployerId: (state, action) => {
            state.editingEmployerId = action.payload;
        },
        resetEditingEmployerId: (state) => {
            state.editingEmployerId = null;
        },
        setIsAdding: (state, action) => {
            state.isAdding = action.payload;
        },
    },
})

const valuesState = (state:RootState):Values => state.values;
export const selectValueIsAdding = createSelector(valuesState,(s)=>s.isAdding);
export const selectValueEditingEmployerId = createSelector(valuesState,(s)=>s.editingEmployerId || "");
