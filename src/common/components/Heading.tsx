import { ReactElement } from "react";
import { StyleSheet, Text } from "react-native";

import { useTheme } from "@/hooks";

interface Props {
  children: string;
}

export function Heading({ children }: Props): ReactElement {
  const {
    theme: { fontFamily, primaryColor },
  } = useTheme();
  return <Text style={[styles.text, { fontFamily, color: primaryColor }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
