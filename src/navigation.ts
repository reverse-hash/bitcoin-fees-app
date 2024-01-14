export enum Screen {
  ALERTS = "Alerts",
  SETTINGS = "Settings",
}

type Screens = [Screen.ALERTS, Screen.SETTINGS];

export type ScreenParamList = Record<Screens[number], undefined>;
