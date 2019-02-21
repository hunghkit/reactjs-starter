import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

export const reducerApp = state => state.get('app');

export const getRouting = () => createSelector(reducerApp, state => state.get('router'));

export const getMenus = () => createSelector(reducerApp, state => (state.getIn(['config', 'menus']) || fromJS([])).toJS());

export const getConfig = (key) => createSelector(reducerApp, state => (state.getIn(['config', key]) || fromJS([])).toJS());

