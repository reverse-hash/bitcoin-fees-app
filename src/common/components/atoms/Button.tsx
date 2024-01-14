import { ReactElement } from "react";
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import Icon from "react-native-ionicons";

import { useTheme } from "@/hooks";

interface Props {
  icon?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  text: string;
}

export function Button({ icon, onPress, style, text }: Props): ReactElement {
  const { theme } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.button, { backgroundColor: theme.buttonColor }]}>
      {icon && <Icon name={icon} size={18} color={theme.primaryColor} style={styles.icon} />}
      <Text style={[styles.text, { color: theme.primaryColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 18,
    textAlign: "center",
  },
});
