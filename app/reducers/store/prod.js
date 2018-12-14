import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import sagas from 'sagas';
import reducers from 'reducers';

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    fromJS(initialState),
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(sagas);

  return store;
};
