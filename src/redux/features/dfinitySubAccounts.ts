import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DfinitySubAccount } from "@/types/global";

const initialState: DfinitySubAccount[] = [];

export const dfinitySubAccountsSlice = createSlice({
  name: "dfinitySubAccounts",
  initialState,
  reducers: {
    addNewDfinitySubAccount: (
      state,
      action: PayloadAction<DfinitySubAccount>
    ) => {
      localStorage.setItem("DSAs", JSON.stringify([...state, action.payload]));
      return [...state, action.payload];
    },
    updateDfinitySubAccounts: (
      state,
      action: PayloadAction<DfinitySubAccount[]>
    ) => {
      localStorage.setItem("DSAs", JSON.stringify(action.payload || []));
      return action.payload || [];
    },
    updateDfinityMainAccount: (
      state,
      action: PayloadAction<DfinitySubAccount>
    ) => {
      let arr = state.concat();
      arr.splice(0, 1, action.payload);
      localStorage.setItem("DSAs", JSON.stringify(arr));
      return arr;
    },
  },
});

export const {
  addNewDfinitySubAccount,
  updateDfinitySubAccounts,
  updateDfinityMainAccount,
} = dfinitySubAccountsSlice.actions;

export default dfinitySubAccountsSlice.reducer;
