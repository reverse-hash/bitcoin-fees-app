import { registerRootComponent } from "expo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { App } from "@/App";
import { ThemeContextProvider } from "@/contexts/theme/ThemeContextProvider";
import { persistor, store } from "@/store";

export function root() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </PersistGate>
    </Provider>
  );
}

export default registerRootComponent(root);
