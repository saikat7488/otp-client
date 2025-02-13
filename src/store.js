// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./feactures/counterSlice/counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
