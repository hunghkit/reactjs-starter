import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

export const reducerUser = state => state.get('currentUser');

export const getCurrentUser = () => createSelector(reducerUser, state => (state.get('info') || fromJS({})).toJS());

export const getIsAsync = () => createSelector(reducerUser, state => state.get('isAsync'));
