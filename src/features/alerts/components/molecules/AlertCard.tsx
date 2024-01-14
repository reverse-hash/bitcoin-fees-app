import { ReactElement, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-ionicons";

import { useTheme } from "@/hooks";
import { i18n } from "@/i18n";

import { Alert, useAlerts } from "../../hooks/useAlerts";

interface Props {
  alert: Alert;
}

export function AlertCard({ alert }: Props): ReactElement {
  const { id, sats, active } = alert;
  const [isEnabled, setIsEnabled] = useState(active);

  const { theme } = useTheme();

  const { deleteAlert, inactivateAlert } = useAlerts();

  const handleDelete = () => deleteAlert(id);

  const onValueChange = (value: boolean) => {
    setIsEnabled(value);

    if (!value) {
      inactivateAlert(id);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceColor }]}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.leftContent}>
          <Text style={[styles.largeText, { color: isEnabled ? theme.primaryColor : theme.secondaryColor }]}>
            {sats}
          </Text>
          <Text style={[styles.smallText, { color: isEnabled ? theme.primaryColor : theme.secondaryColor }]}>
            {sats === 1 ? i18n.t("sat-per-vbyte") : i18n.t("sats-per-vbyte")}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={[styles.rightTopButton, { alignItems: "center" }]} onPress={handleDelete}>
            <Text>
              <Icon name="trash" size={25} color={theme.secondaryColor} />
            </Text>
          </TouchableOpacity>
          <Switch
            trackColor={{ false: theme.secondaryColor, true: theme.secondaryColor }}
            thumbColor={isEnabled ? theme.successColor : theme.neutralColor}
            onValueChange={onValueChange}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 20,
  },
  largeText: {
    fontFamily: "Roboto",
    fontSize: 30,
    marginRight: 10,
  },
  leftContent: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  rightTopButton: {
    borderRadius: 20,
    padding: 5,
  },
  smallText: {
    fontSize: 16,
  },
});
