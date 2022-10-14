import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    name: 'Hospital Logo',
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { update } = uiSlice.actions;
