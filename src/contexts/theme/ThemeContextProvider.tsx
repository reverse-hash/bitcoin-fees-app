import { ReactElement } from "react";
import { useColorScheme } from "react-native";

import * as settingsSlice from "@/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

import darkTheme from "./DarkTheme";
import lightTheme from "./LightTheme";
import { ThemeContext } from "./ThemeContext";

interface Props {
  children: ReactElement;
}

export function ThemeContextProvider({ children }: Props) {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const colorScheme = useColorScheme();
  const isDeviceDarkMode = colorScheme === "dark";
  const isDarkMode = settings.darkMode ?? isDeviceDarkMode;
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggle = () => dispatch(settingsSlice.setDarkMode(!isDarkMode));

  return <ThemeContext.Provider value={{ theme, isDarkMode, toggle }}>{children}</ThemeContext.Provider>;
}
