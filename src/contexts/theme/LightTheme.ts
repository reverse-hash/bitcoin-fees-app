import { lightBackgroundPattern } from "@/assets";

import { Theme } from "./ThemeContext";

const theme: Theme = {
  backgroundColor: "#ffffff",
  backgroundPattern: lightBackgroundPattern,
  buttonColor: "#d9d9d9",
  errorPrimaryColor: "#ffffff",
  errorBackgroundColor: "#c44d56",
  fontFamily: "Roboto",
  levelColor: {
    textColor: "#121212",
    low: ["#7ee2b8", "#4bce97", "#2abb7f", "#22a06b"],
    medium: ["#f5cd47", "#e2b203", "#cf9f02", "#b38600"],
    high: ["#fd9891", "#f87168", "#f15b50", "#e2483d"],
    neutral: ["#b6c0cd", "#9ba8bb", "#8998ae", "#7789a2"],
  },
  neutralColor: "#b6c0cd",
  primaryColor: "#000000",
  shadowColor: "rgb(0, 0, 0, 0.5)",
  secondaryColor: "#868c92",
  statusBarStyle: "dark",
  successColor: "#7ee2b8",
  surfaceColor: "#f2f2f2",
};

export default theme;
