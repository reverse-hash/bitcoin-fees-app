import { ReactElement } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks";

interface Props {
  children: ReactElement | ReactElement[];
}

export function ScreenContainer({ children }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ImageBackground
        style={[styles.background, { backgroundColor: theme.backgroundColor }]}
        source={theme.backgroundPattern}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  container: {
    flex: 1,
  },
});
