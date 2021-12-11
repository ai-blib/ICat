import { createSlice } from "@reduxjs/toolkit";

const initialState: string = "";

export const ICPBalSlice = createSlice({
  name: "ICPBal",
  initialState,
  reducers: {
    updateICPBal: (state, action: { type: string; payload: string }) => {
      return action.payload;
    },
  },
});

export const { updateICPBal } = ICPBalSlice.actions;

export default ICPBalSlice.reducer;
