import { createStore, combineReducers } from "redux";
import { cartReducer } from '../features/cart';
import { statusReducer } from "../features/status";

export const store = createStore(combineReducers(
  {
    cart: cartReducer,
    status: statusReducer
  }
));