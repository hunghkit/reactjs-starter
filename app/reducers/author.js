import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { APPAUTHOR } from 'actions/constants';

// const init = {
//   all: {},
//   count: 0,
//   pageSize: 10,
//   totalPage: 0,
//   currentPage: 0,
//   isLoading: false,
//   title: '',
//   description: '',
// }

export const INITIAL_STATE = fromJS({
  list: {},
  detail: null,
  isLoading: false,
});

export const onDetailRequest = (state, { params }) => state.set('detail', (params || {}).slug).setIn(['list', (params || {}).slug, 'isLoading'], true);

export const onDetailSuccess = (state, { payload }) => {
  const { posts, ...others } = payload || {};
  const { rows = [], count, currentPage, totalPage, pageSize = 10 } = posts || {};
  const results = rows.reduce((obj, item) => ({ ...obj, [item.slug]: item }), {});

  return state.setIn(['list', others.username, 'info'], fromJS(others))
    .setIn(['list', others.username, 'isLoading'], false)
    .setIn(['list', others.username, 'posts'], fromJS({
      all: results,
      count,
      pageSize,
      totalPage,
      currentPage,
    }));
};

export const onDetailFailure = (state, { slug }) => state.setIn(['list', slug, 'isLoading'], false);

export const ACTION_HANDLERS = {
  [APPAUTHOR.APP_AUTHOR_DETAIL_REQUEST]: onDetailRequest,
  [APPAUTHOR.APP_AUTHOR_DETAIL_SUCCESS]: onDetailSuccess,
  [APPAUTHOR.APP_AUTHOR_DETAIL_FAILURE]: onDetailFailure,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
