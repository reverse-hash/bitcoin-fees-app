import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

import { bitcoinFeesApi } from "@/api/bitcoinFeesApi";
import alertsReducer from "@/features/alerts/alertsSlice";

export const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["alerts"],
  blacklist: [],
};

const rootReducer = combineReducers({
  alerts: alertsReducer,
  [bitcoinFeesApi.reducerPath]: bitcoinFeesApi.reducer,
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
    }).concat(bitcoinFeesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
