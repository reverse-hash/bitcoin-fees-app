import { ReactElement } from "react";
import { Text } from "react-native";

import { useTheme } from "@/hooks";

interface Props {
  children: string;
}

export function Label({ children }: Props): ReactElement {
  const {
    theme: { fontFamily, secondaryColor },
  } = useTheme();
  return <Text style={{ fontFamily, color: secondaryColor }}>{children}</Text>;
}
