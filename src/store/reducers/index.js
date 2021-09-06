import { combineReducers } from "redux";

import productReducer from "./product";
import configReducer from "./configrations";
import authReducer from "./auth";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  prod: productReducer,
  config: configReducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
