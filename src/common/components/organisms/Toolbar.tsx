import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ReactElement } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";

import { useTheme } from "@/hooks";
import { Screen, ScreenParamList } from "@/navigation";

export function Toolbar(): ReactElement {
  const navigation = useNavigation<NavigationProp<ScreenParamList>>();
  const { theme } = useTheme();

  const onPress = () => navigation.navigate(Screen.SETTINGS);

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="build" size={20} color={theme.primaryColor} />
    </TouchableOpacity>
  );
}
