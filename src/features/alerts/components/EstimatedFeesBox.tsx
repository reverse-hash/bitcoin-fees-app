import { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BlinkingWrapper } from "@/components";
import { useTheme } from "@/hooks";
import { i18n } from "@/i18n";

interface Props {
  isLoading: boolean | undefined;
  sats: number | null | undefined;
  legend: string;
  backgroundColor: string;
}

export function EstimatedFeesBox({ isLoading, sats, legend, backgroundColor }: Props): ReactElement {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor }}>
      <BlinkingWrapper isLoading={isLoading}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.sats, color: theme.levelColor.textColor }}>{sats ?? "──"}</Text>
          <Text style={{ ...styles.unit, color: theme.levelColor.textColor }}>
            {sats === 1 ? i18n.t("sat-per-vbyte") : i18n.t("sats-per-vbyte")}
          </Text>
          <Text style={{ ...styles.period, color: theme.levelColor.textColor }}>{legend}</Text>
        </View>
      </BlinkingWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
    height: "100%",
    justifyContent: "center",
    marginLeft: -10,
    paddingLeft: 10,
  },
  period: {
    fontSize: 16,
  },
  sats: {
    alignContent: "center",
    fontSize: 22,
    fontWeight: "bold",
  },
  unit: {
    fontSize: 14,
  },
});
