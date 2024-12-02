import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

export type sortStates = 'none' | 'asc' | 'desc';
export type sortName = 'lastInterviewDate';

type Values = {
  editingEmployerId: string | null;
  editingEmployerInterviewId: string | null;
  sorters: Record<sortName, sortStates>;
  isAdding: boolean;
  searchText: string;
};

const initialValues: Values = {
  editingEmployerId: null,
  editingEmployerInterviewId: null,
  isAdding: false,
  sorters: {
    lastInterviewDate: 'none',
  },
  searchText: '',
};

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
    setSortStateInSorters: (state, action) => {
      state.sorters[action.payload.filterName as sortName] =
        action.payload.filterState;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    resetSearchText: (state) => {
      state.searchText = '';
    },
  },
});

const valuesState = (state: RootState): Values => state.values;
export const selectValueIsAdding = createSelector(
  valuesState,
  (s) => s.isAdding
);
export const selectValueEditingEmployerId = createSelector(
  valuesState,
  (s) => s.editingEmployerId || ''
);

export const selectValueSortState = createSelector(
  valuesState,
  (s) => s.sorters
);

export const selectValueSearchText = createSelector(
  valuesState,
  (s) => s.searchText
);
