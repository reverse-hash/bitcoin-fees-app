import * as Crypto from "expo-crypto";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { registerAlertCheckerTask, unregisterAlertCheckerTask } from "@/features/alerts/tasks/AlertCheckerTask";
import { useAppSelector } from "@/hooks";

import * as alertsSlice from "../alertsSlice";
import { Alert } from "./../alertsSlice";

export { Alert } from "./../alertsSlice";

interface UseAlertsReturn {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, "id">) => void;
  activateAlert: (id: string, active: boolean) => void;
  deleteAlert: (id: string) => void;
}

export function useAlerts(): UseAlertsReturn {
  const { alerts } = useAppSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (alerts?.some((alert) => alert.active === true)) {
        registerAlertCheckerTask();
      } else {
        unregisterAlertCheckerTask();
      }
    })();
  }, [alerts]);

  const addAlert = (alert: Omit<Alert, "id">) => {
    const isDuplicateSats = alerts.some((a) => a.sats == alert.sats);
    if (!isDuplicateSats) {
      dispatch(alertsSlice.addAlert({ id: Crypto.randomUUID(), ...alert }));
    }
  };

  const activateAlert = (id: string, active: boolean) => dispatch(alertsSlice.activateAlert({ id, active }));
  const deleteAlert = (id: string) => dispatch(alertsSlice.deleteAlert(id));

  return { alerts, addAlert, activateAlert, deleteAlert };
}
