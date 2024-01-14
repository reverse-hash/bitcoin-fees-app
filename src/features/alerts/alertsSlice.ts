import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InferType, boolean, object, string } from "yup";

import { satsSchema } from "@/schemas";

const alertSchema = object().shape({
  id: string().uuid().required(),
  sats: satsSchema,
  active: boolean().required(),
});

export type Alert = InferType<typeof alertSchema>;

interface AlertsState {
  alerts: Alert[];
}

const initialState: AlertsState = {
  alerts: [],
};

export const alertsSlice = createSlice({
  name: "alerts",
  initialState: initialState,
  reducers: {
    addAlert({ alerts }: AlertsState, action: PayloadAction<Alert>) {
      const alert = action.payload;
      alerts.push(alert);
      alerts.sort((a, b) => a.sats - b.sats);
    },
    inactivateAlert(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.alerts.findIndex((a) => a.id === id);
      if (index !== -1) {
        state.alerts[index].active = false;
      }
    },
    deleteAlert(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.alerts = state.alerts.filter((a) => a.id !== id);
    },
  },
});

export const { addAlert, deleteAlert, inactivateAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
