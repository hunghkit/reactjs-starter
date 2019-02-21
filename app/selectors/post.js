import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerPost = state => state.get('appPost');

export const getLoaded = () => createSelector(reducerPost, state => state.get('isLoading') || false);

export const getPosts = () => createSelector(reducerPost, state => Object.values((state.get('all') || fromJS({})).toJS()));

export const getCount = () => createSelector(reducerPost, state => state.get('count') || 0);

export const getTotalPage = () => createSelector(reducerPost, state => state.get('totalPage') || 0);

export const getCurrentPage = () => createSelector(reducerPost, state => state.get('currentPage') || 0);

export const getPageSize = () => createSelector(reducerPost, state => state.get('pageSize') || 10);

export const getPost = () => createSelector(reducerPost, state => (state.getIn(['all', state.get('detail')]) || fromJS({})).toJS());

export default {
  getPost,
  getPosts,
  getCount,
  getLoaded,
  getPageSize,
  getTotalPage,
  getCurrentPage,
};
