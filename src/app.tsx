import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { ReactElement } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ionicons } from "@/assets";
import { ThemeContextProvider } from "@/contexts/theme/ThemeContextProvider";
import { AlertsHeaderRight, AlertsScreen } from "@/features/alerts";
import { Settings } from "@/features/settings";
import { i18n } from "@/i18n";
import { Screen, ScreenParamList } from "@/navigation";
import { persistor, store } from "@/store";

const Stack = createNativeStackNavigator<ScreenParamList>();

function root(): ReactElement {
  const [fontsLoaded] = useFonts({ Ionicons: ionicons });
  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeContextProvider>
          {(theme) => (
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
                      headerRight: AlertsHeaderRight,
                    }}
                  />
                  <Stack.Screen name={Screen.SETTINGS} component={Settings} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          )}
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default registerRootComponent(root);
