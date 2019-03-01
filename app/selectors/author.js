import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerCategory = state => state.get('appAuthor');

export const getLoaded = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'isLoading']) || false);

export const getInformation = () => createSelector(reducerCategory, state => (state.getIn(['list', state.get('detail') || '', 'info']) || fromJS({})).toJS());

export const getPosts = () => createSelector(reducerCategory, state => Object.values((state.getIn(['list', state.get('detail') || '', 'posts', 'all']) || fromJS({})).toJS()));

export const getCount = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'posts', 'count']) || 0);

export const getTotalPage = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'posts', 'totalPage']) || 0);

export const getCurrentPage = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'posts', 'currentPage']) || 0);

export const getPageSize = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'posts', 'pageSize']) || 10);

export default {
  getPosts,
  getCount,
  getLoaded,
  getPageSize,
  getTotalPage,
  getCurrentPage,

  getInformation,
};
