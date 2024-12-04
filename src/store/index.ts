import { configureStore } from "@reduxjs/toolkit";
import treasuresReducer from "./slices/treasuresSlice";
import usersReducer from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    treasures: treasuresReducer,
    user: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
