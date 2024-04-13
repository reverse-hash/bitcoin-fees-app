import { ReactElement, useState } from "react";
import { useColorScheme } from "react-native";

import darkTheme from "./DarkTheme";
import lightTheme from "./LightTheme";
import { Theme, ThemeContext } from "./ThemeContext";

interface Props {
  children: (theme: Theme) => ReactElement;
}

export function ThemeContextProvider({ children }: Props) {
  const colorSchemeName = useColorScheme();
  const isDefaultDarkMode = colorSchemeName === "dark";
  const [isDarkMode, setDarkMode] = useState<boolean>(isDefaultDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const toggle = () => setDarkMode((prev) => !prev);

  return <ThemeContext.Provider value={{ theme, isDarkMode, toggle }}>{children(theme)}</ThemeContext.Provider>;
}
