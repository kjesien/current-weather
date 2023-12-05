import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weatherSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [weatherSlice.name]: weatherSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch; // usually preferred way to dispatch type safe actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
