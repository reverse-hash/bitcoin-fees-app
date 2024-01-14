import { ReactElement } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";

import { Button } from "@/components";
import { useGetHealthQuery, useTheme } from "@/hooks";
import { i18n } from "@/i18n";
import { HELP_URL } from "@env";

export function ConnectivityBanner(): ReactElement {
  const { theme } = useTheme();
  const { data, error } = useGetHealthQuery(undefined, { pollingInterval: 3000 });
  const isOnline = data && data.status === "ok" && error === undefined;

  const openHelp = () => Linking.openURL(HELP_URL);

  return (
    <>
      {!isOnline && (
        <View style={[styles.container, { backgroundColor: theme.errorBackgroundColor }]}>
          <Text style={[styles.text, { color: theme.errorPrimaryColor }]}>{i18n.t("network-issue")}</Text>

          <Button style={styles.button} icon={"hand"} onPress={openHelp} text={i18n.t("need-more-help")} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  container: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  text: {
    fontSize: 15,
  },
});
