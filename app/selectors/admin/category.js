import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerCategory = state => state.get('adminCategory');

export const getLoaded = (mode = 'post') => createSelector(reducerCategory, state => state.getIn([mode, 'isLoading']) || false);

export const getCategories = (mode = 'post') => createSelector(reducerCategory, state => (state.getIn([mode, 'all']) || fromJS(fromJS([]))).toJS());

export const getCount = (mode = 'post') => createSelector(reducerCategory, state => state.getIn([mode, 'count']) || 0);

export const getTotalPage = (mode = 'post') => createSelector(reducerCategory, state => state.getIn([mode, 'totalPage']) || 0);

export const getCurrentPage = (mode = 'post') => createSelector(reducerCategory, state => state.getIn([mode, 'currentPage']) || 0);

export const getPageSize = (mode = 'post') => createSelector(reducerCategory, state => state.getIn([mode, 'pageSize']) || 10);

export default {
  getCategories,
  getCount,
  getLoaded,
  getPageSize,
  getTotalPage,
  getCurrentPage,
};
