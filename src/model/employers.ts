
// https://redux-toolkit.js.org/api/createEntityAdapter
import {
    createEntityAdapter,
        createSlice,
} from '@reduxjs/toolkit'
import {Employer} from "../types.ts";
import {RootState} from "./store.ts";



const employersAdapter = createEntityAdapter<Employer, Employer['id']>({
    selectId: (e: Employer) => e.id,
    sortComparer: (a: Employer, b: Employer) => b.id.localeCompare(a.id),
})

export const employersSlice = createSlice({
    name: 'employers',
    initialState: employersAdapter.getInitialState(),
    reducers: {
        addEmployer: employersAdapter.addOne,
        updateEmployer: employersAdapter.updateOne,
        upsertEmployer: employersAdapter.upsertOne,
        deleteEmployer: employersAdapter.removeOne,
        setEmployers: employersAdapter.setAll,
        resetEmployers: employersAdapter.removeAll,
    },
})

export const employersSelectors = employersAdapter.getSelectors((state: RootState) => state.employers)
