import { darkBackgroundPattern } from "@/assets";

import { Theme } from "./ThemeContext";

const theme: Theme = {
  backgroundColor: "#121212",
  backgroundPattern: darkBackgroundPattern,
  buttonColor: "#212124",
  errorPrimaryColor: "#ffffff",
  errorBackgroundColor: "#750E21",
  fontFamily: "Roboto",
  levelColor: {
    textColor: "#121212",
    low: ["#22a06b", "#1f845a", "#216e4e", "#164b35"],
    medium: ["#b38600", "#946f00", "#7f5f01", "#533f04"],
    high: ["#e2483d", "#c9372c", "#ae2e24", "#5d1f1a"],
    neutral: ["#7789a2", "#63758d", "#536379", "#313944"],
  },
  neutralColor: "#4e576a",
  primaryColor: "#ffffff",
  secondaryColor: "#B3B3B3",
  shadowColor: "rgb(0, 0, 0, 0.5)",
  statusBarStyle: "light",
  successColor: "#22a06b",
  surfaceColor: "#181818",
};

export default theme;
