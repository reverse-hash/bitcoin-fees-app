import { useEffect, useState } from "react";
import { AppStateStatus, AppState as ReactAppState } from "react-native";

export const enum AppState {
  BACKGROUND,
  FOREGROUND,
}

export function useAppState(): AppState | undefined {
  const [state, setState] = useState<AppState>();

  useEffect(() => {
    const subscription = ReactAppState.addEventListener("change", (state: AppStateStatus) => {
      setState(state === "active" ? AppState.FOREGROUND : AppState.BACKGROUND);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return state;
}
