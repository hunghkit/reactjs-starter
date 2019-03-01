import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerCategory = state => state.get('appCategory');

export const getLoaded = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'isLoading']) || false);

export const getTitle = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'title']) || '');

export const getKeywords = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'keywords']) || '');

export const getDescription = () => createSelector(reducerCategory, state => state.getIn(['list', state.get('detail') || '', 'description']) || '');

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

  getTitle,
  getKeywords,
  getDescription,
};
