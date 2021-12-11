import { createSlice } from "@reduxjs/toolkit";

export interface II {
  plugWallet: any | null;
  principal: string;
  publicKey: string;
  keys: [string, string];
}
const initialState: II | null = {
  plugWallet: null,
  principal: "",
  publicKey: "",
  keys: ["", ""],
};

export const plugWalletSlice = createSlice({
  name: "plugWallet",
  initialState,
  reducers: {
    updatePlugWallet: (state, action: { type: string; payload: II }) => {
      return action.payload;
    },
  },
});

export const { updatePlugWallet } = plugWalletSlice.actions;

export default plugWalletSlice.reducer;
