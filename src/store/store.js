import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
