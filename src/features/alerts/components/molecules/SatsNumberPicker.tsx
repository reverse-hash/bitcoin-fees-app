import * as Haptics from "expo-haptics";
import { ReactElement, useEffect, useState } from "react";
import { PanResponder, PanResponderGestureState, StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/hooks";

const DECIMAL_BASE = 10;
const INVERT = -1;
const SENSIVITIY_ON_MOVE = 0.01;
const TAP_REDUCTION_FACTOR = 0.1;

type SingleDigit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Props {
  initialValue: [SingleDigit, SingleDigit, SingleDigit, SingleDigit];
  onChange: (sats: number) => void;
}

export function SatsNumberPicker({ initialValue, onChange }: Props): ReactElement {
  const [values, setValues] = useState<SingleDigit[]>(initialValue);
  const { theme } = useTheme();

  useEffect(() => {
    const [thousands, hundreds, tens, units] = values;
    const sats = thousands * 1000 + hundreds * 100 + tens * 10 + units;
    onChange(sats);
  }, [values]);

  const updateValue = (valueIndex: number, newValue: SingleDigit) => {
    const newValues = [...values];
    newValues[valueIndex] = newValue;
    setValues(newValues);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleRelease = (valueIndex: number, gestureState: PanResponderGestureState) => {
    const { dy: distanceY } = gestureState;

    // When performing a 'tap' sometimes there is a slight displacement.
    // So, a reduction adjustment is applied, and if there is no movement, it is considered a tap."
    const isTapping = Math.round(distanceY * TAP_REDUCTION_FACTOR) == 0;

    if (isTapping) {
      const currentValuePlusOne = (Math.abs(values[valueIndex] + 1) % DECIMAL_BASE) as SingleDigit;
      updateValue(valueIndex, currentValuePlusOne);
    }
  };

  const handleMove = (valueIndex: number, gestureState: PanResponderGestureState) => {
    const { dy: distanceY } = gestureState;

    // When dragging the finger upward, the distance is negative, and when dragging downward, it is positive.
    // So the distance is reversed because we want the opposite behavior.
    const delta = Math.round(distanceY * INVERT * SENSIVITIY_ON_MOVE);

    if (delta !== 0) {
      const newValue = (Math.abs(values[valueIndex] + delta) % DECIMAL_BASE) as SingleDigit;
      updateValue(valueIndex, newValue);
    }
  };

  const panResponder = (valueIndex: number) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (_, gestureState) => handleRelease(valueIndex, gestureState),
      onPanResponderMove: (_, gestureState) => handleMove(valueIndex, gestureState),
    });

  return (
    <View style={styles.container}>
      {values.map((value, valueIndex) => (
        <View
          key={valueIndex}
          style={[styles.digitPicker, { backgroundColor: theme.buttonColor }]}
          {...panResponder(valueIndex).panHandlers}
        >
          <Text style={[styles.digit, { fontFamily: theme.fontFamily, color: theme.primaryColor }]}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  digit: {
    fontSize: 30,
  },
  digitPicker: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 20,
    flex: 1,
    justifyContent: "center",
  },
});
