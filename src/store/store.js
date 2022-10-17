import { configureStore } from '@reduxjs/toolkit';
import { uiSlice } from './slices/ui';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    users: userReducer,
    ui: uiSlice.reducer,
  },
});
