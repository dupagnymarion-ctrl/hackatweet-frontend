import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

export const trendSlice = createSlice({
  name: 'trend',
  initialState,
  reducers: {
    research: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = null;
    },
  },
});

export const { research, reset } = trendSlice.actions;
export default trendSlice.reducer;
