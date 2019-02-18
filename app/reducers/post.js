import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { APPPOST } from 'actions/constants';

const init = {
  all: {},
  count: 0,
  pageSize: 10,
  totalPage: 0,
  currentPage: 0,
  isLoading: false,
}

export const INITIAL_STATE = fromJS(init);

export const onSearchRequest = (state) => state.set('isLoading', true);

export const onSearchSuccess = (state, { payload = {} }) => {
  const { rows = [], count, currentPage, totalPage, pageSize = 10 } = payload || {};
  const results = rows.reduce((obj, item) => ({ ...obj, [item.uuid]: item }), {});

  return state.set('isLoading', false)
    .set('all', fromJS(results))
    .set('count', count)
    .set('pageSize', pageSize)
    .set('totalPage', totalPage)
    .set('currentPage', currentPage);
};

export const onSearchFailure = (state) => state.set('isLoading', false);

export const ACTION_HANDLERS = {
  [APPPOST.APP_POST_SEARCH_REQUEST]: onSearchRequest,
  [APPPOST.APP_POST_SEARCH_SUCCESS]: onSearchSuccess,
  [APPPOST.APP_POST_SEARCH_FAILURE]: onSearchFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
