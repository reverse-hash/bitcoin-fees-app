import { useIsFocused } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { ReactElement, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppState, useAppState, useGetEstimatedFeesQuery, useTheme } from "@/hooks";
import { i18n } from "@/i18n";

import { EstimatedFeesBox } from "./EstimatedFeesBox";

const ONE_MINUTE = 60000;

export function EstimatedFeesPanel(): ReactElement {
  const { theme } = useTheme();

  const { data, isFetching, error, refetch } = useGetEstimatedFeesQuery(undefined, {
    pollingInterval: ONE_MINUTE,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const isLoading = isFetching || Boolean(error);

  const isFocused = useIsFocused();

  const appState = useAppState();

  const palette = data?.level !== undefined ? theme.levelColor[data.level] : theme.levelColor.neutral;

  const onPress = () => {
    refetch();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  useEffect(() => {
    refetch();
  }, [isFocused]);

  useEffect(() => {
    if (appState === AppState.FOREGROUND) {
      refetch();
    }
  }, [appState]);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <EstimatedFeesBox
          isLoading={isLoading}
          sats={data?.lessThan24hours}
          legend={i18n.t("less-than-n-hours", 24)}
          backgroundColor={palette[3]}
        />
        <EstimatedFeesBox
          isLoading={isLoading}
          sats={data?.lessThan6hours}
          legend={i18n.t("less-than-n-hours", 6)}
          backgroundColor={palette[2]}
        />
        <EstimatedFeesBox
          isLoading={isLoading}
          sats={data?.lessThan1hour}
          legend={i18n.t("less-than-1-hour")}
          backgroundColor={palette[1]}
        />
        <EstimatedFeesBox
          isLoading={isLoading}
          sats={data?.lessThan20min}
          legend={i18n.t("less-than-20-min")}
          backgroundColor={palette[0]}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    height: 100,
  },
});
