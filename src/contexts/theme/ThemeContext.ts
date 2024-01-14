import { createContext } from "react";
import { ImageSourcePropType } from "react-native";

import lightTheme from "./LightTheme";

export interface Theme {
  backgroundColor: string;
  backgroundPattern: ImageSourcePropType;
  buttonColor: string;
  errorBackgroundColor: string;
  errorPrimaryColor: string;
  fontFamily: string;
  levelColor: {
    textColor: string;
    low: [string, string, string, string];
    medium: [string, string, string, string];
    high: [string, string, string, string];
    neutral: [string, string, string, string];
  };
  neutralColor: string;
  primaryColor: string;
  secondaryColor: string;
  shadowColor: string;
  statusBarStyle: "light" | "dark";
  successColor: string;
  surfaceColor: string;
}

interface ThemeContextValue {
  theme: Theme;
  isDarkMode: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  isDarkMode: false,
  toggle: () => {},
});
