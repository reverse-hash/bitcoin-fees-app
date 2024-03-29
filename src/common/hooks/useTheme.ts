import { useContext } from "react";

import { ThemeContext } from "@/contexts/theme";

export function useTheme() {
  const style = useContext(ThemeContext);
  return style;
}
