import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import user slice

const store = configureStore({
  reducer: {
    user: userReducer, // Register user reducer
  },
});

export default store;
