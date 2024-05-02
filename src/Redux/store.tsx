// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import moviesReducer from "./Features/Movies/moviesSlice"

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
