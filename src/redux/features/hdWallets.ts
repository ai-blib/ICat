import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ed25519Account } from "@/types/global";

const initialState: Ed25519Account[] = [];

export const hdWalletsSlice = createSlice({
  name: "hdWallets",
  initialState,
  reducers: {
    resetMainHdWallet: (state, action: PayloadAction<Ed25519Account>) => {
      const arr = state.concat();
      arr[0] = action.payload;
      return arr;
    },
    addNewHdWallet: (state, action: PayloadAction<Ed25519Account>) => {
      return [...state, action.payload];
    },
    updateHdWallets: (state, action: PayloadAction<Ed25519Account[]>) => {
      return action.payload || [];
    },
  },
});

export const { resetMainHdWallet, addNewHdWallet, updateHdWallets } =
  hdWalletsSlice.actions;

export default hdWalletsSlice.reducer;
