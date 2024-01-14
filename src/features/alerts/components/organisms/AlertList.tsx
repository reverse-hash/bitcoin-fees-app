import { ReactElement } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useAppSelector, useTheme } from "@/hooks";
import { i18n } from "@/i18n";

import { AlertCard } from "../molecules";

export function AlertList(): ReactElement {
  const { theme } = useTheme();
  const { alerts } = useAppSelector((state) => state.alerts);

  return (
    <View style={styles.container}>
      {alerts.length > 0 && <FlatList data={alerts} renderItem={({ item }) => <AlertCard alert={item} />} />}
      {alerts.length == 0 && (
        <View style={styles.emptyContainer}>
          <Text style={{ fontFamily: theme.fontFamily, fontSize: 16, color: theme.secondaryColor }}>
            {i18n.t("alert-list-empty")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});
