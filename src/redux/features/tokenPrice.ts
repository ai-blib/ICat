import { createSlice } from "@reduxjs/toolkit";
import { TokenPrice } from "@/types/global";

const initialState: TokenPrice[] = [];

export const tokenPriceSlice = createSlice({
  name: "tokenPrice",
  initialState,
  reducers: {
    updateTokenPrice: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateTokenPrice } = tokenPriceSlice.actions;

export default tokenPriceSlice.reducer;
