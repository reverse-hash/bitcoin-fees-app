import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

import { Heading } from "@/components";
import { useTheme } from "@/hooks";

interface ContainerProps {
  name: string;
  children: ReactElement | ReactElement[];
}

export function Section({ name, children }: ContainerProps): ReactElement {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceColor }]}>
      <Heading>{name}</Heading>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
