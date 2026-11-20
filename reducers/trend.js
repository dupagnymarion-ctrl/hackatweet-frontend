import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  trigger:false
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
    newTrigger: (state, action) => {
      state.trigger = !state.trigger;
    }
  },
});

export const { research, reset,newTrigger } = trendSlice.actions;
export default trendSlice.reducer;
