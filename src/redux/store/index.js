import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers/shop";
import userReducer from "../reducers/user";
import prodottoReducer from "../reducers/prodotto";

const bigReducer = combineReducers({
  user: userReducer,
  cart: shopReducer,
  prodotto: prodottoReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
