import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InferType, boolean, object } from "yup";

const settingsSchema = object().shape({
  darkMode: boolean().optional(),
});

export type SettingsState = InferType<typeof settingsSchema>;

const initialState: SettingsState = {
  darkMode: undefined,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = settingsSlice.actions;
export default settingsSlice.reducer;
