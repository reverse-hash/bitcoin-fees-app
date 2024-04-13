import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Application from "expo-application";

import { activateAlert } from "@/features/alerts/alertsSlice";
import { store } from "@/store";
import { bitcoinFeesApi } from "@/hooks";
import { i18n } from "@/i18n";

const BACKGROUND_FETCH_TASK = "alert-checker";

export async function registerAlertCheckerTask(): Promise<void> {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 30, //60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterAlertCheckerTask(): Promise<void> {
  BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK).catch((err: any) =>
    console.log("Task is not registered and we try to unregister " + err),
  );
}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const { alerts: alertsState } = store.getState();
  const activeAlerts = alertsState?.alerts.filter((alert) => alert.active === true);

  if (activeAlerts === undefined || activeAlerts.length === 0) {
    console.log("unregisterTask");
    await unregisterAlertCheckerTask();
    return BackgroundFetch.BackgroundFetchResult.NoData;
  }

  const { data: fees, isSuccess } = await store.dispatch(bitcoinFeesApi.endpoints.getEstimatedFees.initiate());
  console.log("fetch data from api");
  if (!isSuccess) {
    console.log("failure fetching data");
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
  console.log(JSON.stringify(fees));

  const triggeredAlerts = activeAlerts.filter((alert) => fees.lessThan20min <= alert.sats);
  console.log(JSON.stringify(triggeredAlerts));
  if (triggeredAlerts.length !== 0) {
    console.log("alarm triggered");

    const firstAlert = triggeredAlerts[0];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: Application.applicationName,
        body: firstAlert.sats === 1 ? i18n.t("network-fees-1-sat") : i18n.t("network-fees-n-sats", firstAlert.sats),
      },
      trigger: {
        seconds: 1,
      },
    });

    for await (const alert of triggeredAlerts) {
      store.dispatch(activateAlert({ id: alert.id, active: false }));
    }
  }

  return BackgroundFetch.BackgroundFetchResult.NewData;
});
