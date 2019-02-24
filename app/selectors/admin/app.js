import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerApp = state => state.get('adminApp');

export const getLoaded = (mode = 'setting') => createSelector(reducerApp, state => state.getIn([mode, 'isLoading']) || false);

export const getInfo = (mode = 'setting') => createSelector(reducerApp, state => (state.getIn([mode, 'info']) || fromJS({})).toJS());

export const getLayout = (mode = 'header') => createSelector(reducerApp, state => (state.getIn(['layout', mode]) || fromJS({})).toJS());

export default {
  reducerApp,
  getInfo,
  getLoaded,
  getLayout,
};
