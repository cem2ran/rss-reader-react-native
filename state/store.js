import { createStore, applyMiddleware } from "redux";

import { createNavigationEnabledStore } from "@exponent/ex-navigation";

import { createEpicMiddleware } from "redux-observable";

import rootEpic from "./epics";

import rootReducer from "./reducers";

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
const createStoreWithNavigation = createNavigationEnabledStore({
  createStore: createStoreWithMiddleware
});
const store = createStoreWithNavigation(rootReducer);

if (module.hot) {
  module.hot.accept(() => {
    const nextRootReducer = require("./reducers/index").default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
