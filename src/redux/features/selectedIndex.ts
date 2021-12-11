import { createSlice } from "@reduxjs/toolkit";

const initialState: number = -1;

export const selectedIndexSlice = createSlice({
  name: "selectedIndex",
  initialState,
  reducers: {
    updateSelectedIndex: (state, action) => {
      localStorage.setItem("index", action.payload.toString());
      return action.payload;
    },
  },
});

export const { updateSelectedIndex } = selectedIndexSlice.actions;

export default selectedIndexSlice.reducer;
