import * as Notifications from "expo-notifications";
import { ReactElement, useEffect } from "react";
import { StyleSheet } from "react-native";

import { Button, ScreenContainer } from "@/components";
import { i18n } from "@/i18n";

import { AddAlertModal, AlertList, ConnectivityBanner, EstimatedFeesPanel } from "./components";
import { registerAlertCheckerTask } from "./tasks";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export function AlertsScreen(): ReactElement {
  // useEffect(() => {
  //   // (async () => {
  //   //   await registerAlertCheckerTask();
  //   // })();
  //   registerAlertCheckerTask();
  // }, []);

  useEffect(() => {
    registerAlertCheckerTask();
  }, []);

  return (
    <ScreenContainer>
      <ConnectivityBanner />
      <EstimatedFeesPanel />
      <AlertList />
      <AddAlertModal>
        {(onOpen) => <Button icon="notifications" onPress={onOpen} style={styles.button} text={i18n.t("add-alert")} />}
      </AddAlertModal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    bottom: 20,
    position: "absolute",
    right: 20,
    zIndex: 999,
  },
});
