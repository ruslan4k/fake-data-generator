/**
 * Create the store with dynamic reducers
 */
import { all, fork } from 'redux-saga/effects';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import userSagas from './user/userSagas';
import dataGenerationSagas from './dataGeneration/dataGenerationSagas';

import createReducer from './rootReducer';

export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  const reduxSagaMonitorOptions = {};

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    /* eslint-disable no-underscore-dangle */
    // eslint-disable-next-line no-undef
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      // eslint-disable-next-line no-undef
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
    }
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

  function* sagas() {
    yield all([fork(userSagas)]);
    yield all([fork(dataGenerationSagas)]);
  }

  sagaMiddleware.run(sagas);

  // Extensions
  store.runSaga = sagaMiddleware.run;
  return store;
}
