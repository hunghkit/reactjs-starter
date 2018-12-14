import { fromJS } from 'immutable';
import { createReducer } from 'reduxsauce';
import { LOGIN } from 'actions/constants';

export const INITIAL_STATE = fromJS({
  info: {},
  message: '',
  isAsync: false,
  isLoading: false,
});

export const onLogoutSuccess = (state) => state.set('isAsync', true).set('info', fromJS({})).set('isLoading', true).set('message', '');

export const onRefreshRequest = (state) => state.set('isAsync', false);

export const onRefreshFailure = (state) => state.set('isAsync', true);

export const onRefreshSuccess = (state, { user = {} }) => state.set('isAsync', true).set('info', fromJS(user));

export const onSubmitRequest = (state) => state.set('isLoading', true).set('message', '');

export const onSubmitFailure = (state, { message }) => state.set('isLoading', false).set('message', message);

export const onSubmitSuccess = (state, { user }) => state.set('isLoading', false).set('message', '').set('info', fromJS(user));

export const ACTION_HANDLERS = {
  [LOGIN.LOGOUT_SUCCESS]: onLogoutSuccess,
  [LOGIN.REFRESH_REQUEST]: onRefreshRequest,
  [LOGIN.REFRESH_FAILURE]: onRefreshFailure,
  [LOGIN.REFRESH_SUCCESS]: onRefreshSuccess,
  [LOGIN.SUBMITING_REQUEST]: onSubmitRequest,
  [LOGIN.SUBMITING_FAILURE]: onSubmitFailure,
  [LOGIN.SUBMITING_SUCCESS]: onSubmitSuccess,
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);
