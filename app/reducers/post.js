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
  detail: null,
}

export const INITIAL_STATE = fromJS(init);

export const onSearchRequest = (state) => state.set('isLoading', true);

export const onSearchSuccess = (state, { payload = {} }) => {
  const { rows = [], count, currentPage, totalPage, pageSize = 10 } = payload || {};
  const results = rows.reduce((obj, item) => ({ ...obj, [item.slug]: item }), {});

  return state.set('isLoading', false)
    .set('all', fromJS(results))
    .set('count', count)
    .set('pageSize', pageSize)
    .set('totalPage', totalPage)
    .set('currentPage', currentPage);
};

export const onSearchFailure = (state) => state.set('isLoading', false);

export const onDetailRequest = (state, { params = {} }) => state.set('isLoading', true).set('detail', params.slug);

export const onDetailSuccess = (state, { payload = {} }) => state.set('isLoading', false).setIn(['all', payload.slug], fromJS(payload));

export const onDetailFailure = (state) => state.set('isLoading', false);

export const ACTION_HANDLERS = {
  [APPPOST.APP_POST_SEARCH_REQUEST]: onSearchRequest,
  [APPPOST.APP_POST_SEARCH_SUCCESS]: onSearchSuccess,
  [APPPOST.APP_POST_SEARCH_FAILURE]: onSearchFailure,
  [APPPOST.APP_POST_DETAIL_REQUEST]: onDetailRequest,
  [APPPOST.APP_POST_DETAIL_SUCCESS]: onDetailSuccess,
  [APPPOST.APP_POST_DETAIL_FAILURE]: onDetailFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
