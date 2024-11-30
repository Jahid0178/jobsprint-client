import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import jobSlice from "../features/job/jobSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
