import { ReactElement } from "react";
import { Text } from "react-native";

import { useTheme } from "@/hooks";

interface Props {
  children: string | number;
}

export function TextValue({ children }: Props): ReactElement {
  const {
    theme: { fontFamily, primaryColor },
  } = useTheme();
  return <Text style={{ fontFamily, color: primaryColor }}>{children}</Text>;
}
