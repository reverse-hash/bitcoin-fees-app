import { ScrollView, StyleSheet, Switch, View } from "react-native";
import * as Application from "expo-application";

import { ScreenContainer } from "@/components";
import { useTheme } from "@/hooks";
import { i18n } from "@/i18n";
import { API_URL, APP_VERSION } from "@env";

import { Label, Section, TextValue } from "./components";

export function Settings() {
  const { theme, isDarkMode, toggle } = useTheme();

  return (
    <ScreenContainer>
      <ScrollView>
        <Section name={i18n.t("appearance")}>
          <View style={styles.row}>
            <Label>{i18n.t("dark-mode")}</Label>
            <Switch
              style={styles.swith}
              trackColor={{ false: theme.secondaryColor, true: theme.secondaryColor }}
              thumbColor={isDarkMode ? theme.successColor : theme.neutralColor}
              onValueChange={toggle}
              value={isDarkMode}
            />
          </View>
        </Section>
        <Section name={i18n.t("about")}>
          <View style={styles.row}>
            <Label>{i18n.t("server")}</Label>
            <TextValue>{API_URL}</TextValue>
          </View>
          <View style={styles.row}>
            <Label>{i18n.t("version")}</Label>
            <TextValue>{APP_VERSION}</TextValue>
          </View>
          <View style={styles.row}>
            <Label>{i18n.t("build")}</Label>
            <TextValue>{Application.nativeBuildVersion ?? "0"}</TextValue>
          </View>
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  swith: {
    position: "absolute",
    right: 0,
  },
});
