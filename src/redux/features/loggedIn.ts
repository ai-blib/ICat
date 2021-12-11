import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    updateLoggedIn: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateLoggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
