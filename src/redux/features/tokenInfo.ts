import { createSlice } from "@reduxjs/toolkit";
import { Token } from "@/types/global";

const initialState: Token[] = [];

export const tokenInfoSlice = createSlice({
  name: "tokenInfo",
  initialState,
  reducers: {
    updateTokenInfo: (state, action: { type: string; payload: Token[] }) => {
      return action.payload;
    },
    // addTokenInfo: (state, action: { type: string; payload: Token }) => { // it could mess up the order and length
    //   let arr = state
    //     .filter((i) => i.canisterId !== action.payload.canisterId)
    //     .concat(action.payload);
    //   return arr;
    // },
  },
});

export const { updateTokenInfo } = tokenInfoSlice.actions;

export default tokenInfoSlice.reducer;
