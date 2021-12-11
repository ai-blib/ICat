import { createSlice } from "@reduxjs/toolkit";
import { TokenMetadata } from "@/types/global";

const initialState: TokenMetadata[] = [];

export const tokenMetaDataSlice = createSlice({
  name: "tokenMetaData",
  initialState,
  reducers: {
    updateTokenMetaData: (
      state,
      action: { type: string; payload: TokenMetadata[] }
    ) => {
      return action.payload;
    },
    addTokenMetaData: (
      state,
      action: { type: string; payload: TokenMetadata }
    ) => {
      let arr = state
        .filter((i) => i.canisterId !== action.payload.canisterId)
        .concat(action.payload);
      return arr;
    },
  },
});

export const { updateTokenMetaData, addTokenMetaData } =
  tokenMetaDataSlice.actions;

export default tokenMetaDataSlice.reducer;
