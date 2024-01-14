import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

import { estimateFeesApi } from "@/api/estimatedFeesApi";
import alertsReducer from "@/features/alerts/alertsSlice";
import settingsSlice from "@/features/settings/settingsSlice";

export const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["alerts", "settings"],
  blacklist: [],
};

const rootReducer = combineReducers({
  alerts: alertsReducer,
  settings: settingsSlice,
  [estimateFeesApi.reducerPath]: estimateFeesApi.reducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(estimateFeesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
