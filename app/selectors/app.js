import { createSelector } from 'reselect';

export const reducerApp = state => state.get('app');

export const getRouting = () => createSelector(reducerApp, state => state.get('router'));
