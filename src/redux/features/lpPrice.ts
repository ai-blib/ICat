import { createSlice } from "@reduxjs/toolkit";
import { LpPrice } from "@/types/global";

const initialState: LpPrice[] = [];

export const lpPriceSlice = createSlice({
  name: "lpPrice",
  initialState,
  reducers: {
    updateLpPrice: (state, action: { type: string; payload: LpPrice[] }) => {
      return action.payload;
    },
    addLpPrice: (state, action: { type: string; payload: LpPrice }) => {
      // after a lp created (lp has to contain WICPT)
      let arr = state.concat(action.payload);
      return arr;
    },
  },
});

export const { updateLpPrice, addLpPrice } = lpPriceSlice.actions;

export default lpPriceSlice.reducer;
