import {combineReducers, createStore, applyMiddleware} from 'redux';

import * as reducers from './reducers';

import {NavigationReducer as navigation, createNavigationEnabledStore} from '@exponent/ex-navigation';

const rootReducer = combineReducers({
  navigation, ...reducers
});

import {createEpicMiddleware} from 'redux-observable';

import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware)(createStore);
const createStoreWithNavigation = createNavigationEnabledStore({createStore: createStoreWithMiddleware});
const store = createStoreWithNavigation(rootReducer);

export default store;
