import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers/shop";
import userReducer from "../reducers/user";
import prodottoReducer from "../reducers/prodotto";

const bigReducer = combineReducers({
  cart: shopReducer,
  user: userReducer,
  prodotto: prodottoReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
