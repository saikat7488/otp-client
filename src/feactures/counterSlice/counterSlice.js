// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeLeft: 120, // starting time in seconds
  isRunning: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    resetTimer: (state) => {
      state.timeLeft = 60;
      state.isRunning = false;
    },
    decrementTime: (state) => {
      if (state.isRunning && state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, decrementTime } =
  counterSlice.actions;

export default counterSlice.reducer;
