import { fromJS } from 'immutable';
import { persistState } from 'redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from 'sagas';
import reducers from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    fromJS(initialState),
    enhancer,
  );

  store.runSaga = sagaMiddleware.run;
  store.runSaga(sagas);

  if (module.hot) {
    module.hot.accept('../', () => store.replaceReducer(require('../').default));
  }

  return store;
};
