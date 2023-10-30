import { createSlice } from '@reduxjs/toolkit';

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState: {
      value: 0,
    },
    reducers: {
      add: (state, action) => {
        state.value = action.payload;
      },
      subtract: (state, action) => {
        state.value = action.payload;
      },
      multiply: (state, action) => {
        state.value = action.payload;
      },
      divide: (state, action) => {
        state.value = action.payload;
      },
      reset: (state) => {
        state.value = 0;
      },
    },
  });

export const { add, subtract, multiply, divide, reset } = calculatorSlice.actions;

export default calculatorSlice.reducer;
