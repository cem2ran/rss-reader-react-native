import { combineReducers } from "redux";
import { NavigationReducer as navigation } from "@exponent/ex-navigation";

import sources from "./sources";

const rootReducer = combineReducers({
  navigation,
  sources
});

export default rootReducer;
