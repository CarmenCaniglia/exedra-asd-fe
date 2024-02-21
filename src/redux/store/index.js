import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers/shop";
import userReducer from "../reducers/user";
import prodottoReducer from "../reducers/prodotto";
import abbonamentoReducer from "../reducers/abbonamento";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const bigReducer = combineReducers({
  user: userReducer,
  cart: shopReducer,
  prodotto: prodottoReducer,
  abbonamenti: abbonamentoReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, bigReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
