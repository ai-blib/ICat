import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "@/types/global";

const initialState: Notification[] = [];

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    updateNotification: (
      state,
      action: { type: string; payload: Notification[] }
    ) => {
      return action.payload;
    },
    addNotification: (
      state,
      action: { type: string; payload: Notification }
    ) => {
      let arr = state.concat(action.payload);
      return arr;
    },
  },
});

export const { updateNotification, addNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
