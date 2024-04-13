import { ReactElement } from "react";
import { Animated } from "react-native";

interface Props {
  children: ReactElement;
  isLoading: boolean | undefined;
}

export function BlinkingWrapper({ children, isLoading }: Props): ReactElement {
  const opacity = new Animated.Value(1);
  const animation = Animated.sequence([
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 750,
      useNativeDriver: true,
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration: 750,
      useNativeDriver: true,
    }),
  ]);
  Animated.loop(animation).start();

  return <>{isLoading === false ? children : <Animated.View style={{ opacity }}>{children}</Animated.View>}</>;
}
