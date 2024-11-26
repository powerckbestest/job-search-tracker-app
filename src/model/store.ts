/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { employersSlice } from './employers.ts';
import { valuesSlice } from './values.ts';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем localStorage

const rootReducer = combineReducers({
  [valuesSlice.name]: valuesSlice.reducer,
  [employersSlice.name]: employersSlice.reducer,
});

const migrations = {
  0: (state: any) => {
    return { ...state };
  },
  1: (state: any) => {
    return {
      ...state,
      values: {
        ...state.values,
        sorters: {
          lastInterviewDate: 'none',
        },
      },
    };
  },
};

const persistConfig = {
  key: 'job-search-tracker-app-state',
  version: 1,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const persistor = persistStore(store);
