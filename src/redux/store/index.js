import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers/shop";
import userReducer from "../reducers/user";
import prodottoReducer from "../reducers/prodotto";
import abbonamentoReducer from "../reducers/abbonamento";

const bigReducer = combineReducers({
  user: userReducer,
  cart: shopReducer,
  prodotto: prodottoReducer,
  abbonamenti: abbonamentoReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
