import { createSlice } from "@reduxjs/toolkit";
import { TokenPair } from "@/types/global";

const initialState: TokenPair[] = [];

export const lpInfoSlice = createSlice({
  name: "lpInfo",
  initialState,
  reducers: {
    updateLpInfo: (state, action: { type: string; payload: TokenPair[] }) => {
      return action.payload;
    },
    addLpInfo: (state, action: { type: string; payload: TokenPair }) => {
      let arr = state
        .filter((i) => i.id !== action.payload.id)
        .concat(action.payload);
      return arr;
    },
  },
});

export const { updateLpInfo, addLpInfo } = lpInfoSlice.actions;

export default lpInfoSlice.reducer;
