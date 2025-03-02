import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  name: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.name = action.payload.name;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = "";
      state.password = "";
      state.name = "";
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions; // Export actions
export default userSlice.reducer; // Export reducer
