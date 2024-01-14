import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { ReactElement } from "react";
import { View } from "react-native";

import { ionicons } from "@/assets";
import { Toolbar } from "@/components";
import { AlertsScreen } from "@/features/alerts/AlertsScreen";
import { Settings } from "@/features/settings/SettingsScreen";
import { useTheme } from "@/hooks";
import { i18n } from "@/i18n";
import { Screen, ScreenParamList } from "@/navigation";

const Stack = createNativeStackNavigator<ScreenParamList>();

export function App(): ReactElement {
  const [fontsLoaded] = useFonts({ Ionicons: ionicons });
  const { theme } = useTheme();

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Screen.ALERTS}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.backgroundColor,
            },
            headerTitleStyle: {
              fontFamily: theme.fontFamily,
              fontSize: 20,
              color: theme.primaryColor,
            },
            headerShadowVisible: false,
            headerTintColor: theme.primaryColor,
            statusBarColor: theme.backgroundColor,
            statusBarStyle: theme.statusBarStyle,
          }}
        >
          <Stack.Screen
            name={Screen.ALERTS}
            component={AlertsScreen}
            options={{
              headerTitle: i18n.t("alerts"),
              headerRight: Toolbar,
            }}
          />
          <Stack.Screen name={Screen.SETTINGS} component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
