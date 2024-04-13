import { ReactElement, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-ionicons";

import { Button, Heading } from "@/components";
import { useTheme } from "@/hooks";
import { i18n } from "@/i18n";

import { useAlerts } from "../hooks/useAlerts";
import { useDisclosure } from "../hooks/useDisclosure";
import { SatsNumberPicker } from "./SatsNumberPicker";

interface Props {
  children: (onOpen: () => void) => ReactElement;
}

const DEFAULT_SATS = 1;

export function AddAlertModal({ children }: Props): ReactElement {
  const [isOpen, onClose, onOpen] = useDisclosure();
  const [sats, setSats] = useState<number>(DEFAULT_SATS);
  const [error, setError] = useState(false);
  const { alerts, addAlert } = useAlerts();
  const { theme } = useTheme();

  useEffect(() => {
    if (isOpen) {
      setError(false);
    }
  }, [isOpen]);

  const handlePressButton = () => {
    const isDuplicated = alerts.some((alert) => alert.sats == sats);
    if (isDuplicated) {
      setError(true);
      return;
    }

    addAlert({ sats, active: true });
    onClose();
  };

  return (
    <>
      {isOpen ? (
        <View style={[styles.container, { backgroundColor: theme.shadowColor }]}>
          <Modal animationType="slide" transparent={true} onRequestClose={() => onClose()}>
            <View style={[styles.modal, { backgroundColor: theme.surfaceColor }]}>
              <View style={styles.header}>
                <Heading>{i18n.t("set-alert-threshold")}</Heading>
                <TouchableOpacity onPress={onClose} style={styles.close}>
                  <Icon name="close" size={25} color={theme.primaryColor} />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={[styles.description, { fontFamily: theme.fontFamily, color: theme.secondaryColor }]}>
                  {i18n.t("enter-sats-per-vbyte")}
                </Text>
                {error && (
                  <Text
                    style={[
                      styles.error,
                      {
                        fontFamily: theme.fontFamily,
                        backgroundColor: theme.errorBackgroundColor,
                        color: theme.primaryColor,
                      },
                    ]}
                  >
                    {i18n.t("alert-duplicated")}
                  </Text>
                )}
                <SatsNumberPicker initialValue={[0, 0, 0, DEFAULT_SATS]} onChange={setSats} />
              </View>
              <View style={styles.footer}>
                <Button icon="notifications" onPress={handlePressButton} text={i18n.t("add-alert")} />
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        children(onOpen)
      )}
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    paddingLeft: 50,
  },
  container: {
    bottom: 0,
    justifyContent: "space-between",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 2,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  error: {
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    padding: 5,
    textAlign: "center",
  },
  footer: {
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    alignSelf: "flex-end",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: "auto",
    padding: 20,
    width: "100%",
  },
});
