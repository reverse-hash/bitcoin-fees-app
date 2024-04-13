import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ReactElement } from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-ionicons";

import { useTheme } from "@/hooks";
import { Screen, ScreenParamList } from "@/navigation";
import { DEVELOPER_MODE } from "@env";

export function AlertsHeaderRight(): ReactElement {
  const navigation = useNavigation<NavigationProp<ScreenParamList>>();
  const { theme } = useTheme();

  const onPress = () => navigation.navigate(Screen.SETTINGS);

  return (
    <>
      {DEVELOPER_MODE && (
        <TouchableOpacity onPress={onPress}>
          <Icon name="build" size={20} color={theme.primaryColor} />
        </TouchableOpacity>
      )}
    </>
  );
}
