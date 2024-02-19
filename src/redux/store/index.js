import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../reducers";

const store = configureStore({
  reducer: shopReducer,
});

export default store;
