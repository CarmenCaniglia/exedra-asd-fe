import { combineReducers, configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers/shop";
import userReducer from "../reducers/user";

const bigReducer = combineReducers({
  cart: shopReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: bigReducer,
});

export default store;
