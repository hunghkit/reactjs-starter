import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { ADMINCATEGORY } from 'actions/constants';

const init = {
  all: [],
  count: 0,
  pageSize: 10,
  totalPage: 0,
  currentPage: 0,
  isLoading: false,
}

export const INITIAL_STATE = fromJS({
  post: init,
});

export const onSearchRequest = (state, { mode = 'post' }) => state.setIn([mode, 'isLoading'], true);

export const onSearchSuccess = (state, { payload = {}, mode = 'post' }) => {
  const { rows = [], count, currentPage, totalPage, pageSize = 10 } = payload || {};

  return state.setIn([mode, 'isLoading'], false)
    .setIn([mode, 'count'], count)
    .setIn([mode, 'all'], fromJS(rows))
    .setIn([mode, 'pageSize'], pageSize)
    .setIn([mode, 'totalPage'], totalPage)
    .setIn([mode, 'currentPage'], currentPage);
};

export const onCreateSuccess = (state, { category }) => {
  const mode = category.type;
  const { all = [], count, currentPage, pageSize = 10 } = (state.get(mode) || fromJS({})).toJS();

  return state.setIn([mode, 'isLoading'], false)
    .setIn([mode, 'count'], count + 1)
    .setIn([mode, 'pageSize'], pageSize)
    .setIn([mode, 'currentPage'], currentPage)
    .setIn([mode, 'all'], fromJS([category, ...all]))
    .setIn([mode, 'totalPage'], Math.ceil((count + 1) / pageSize));
};

export const onSearchFailure = (state, { mode = 'post' }) => state.setIn([mode, 'isLoading'], false);

export const ACTION_HANDLERS = {
  [ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_REQUEST]: onSearchRequest,
  [ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_SUCCESS]: onSearchSuccess,
  [ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_FAILURE]: onSearchFailure,
  [ADMINCATEGORY.ADMIN_CATEGORY_CREATE_SUCCESS]: onCreateSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
