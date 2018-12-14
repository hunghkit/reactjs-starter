import { LOGIN } from './constants';

export const onSubmitRequest = (params = {}, cb = false) => ({ type: LOGIN.SUBMITING_REQUEST, user: params, cb });

export const onSubmitFailure = (message) => ({ type: LOGIN.SUBMITING_FAILURE, message });

export const onSubmitSuccess = (user = {}) => ({ type: LOGIN.SUBMITING_SUCCESS, user });

export const onLogoutRequest = (message) => ({ type: LOGIN.LOGOUT_REQUEST, message });

export const onLogoutFailure = (message) => ({ type: LOGIN.LOGOUT_FAILURE, message });

export const onLogoutSuccess = () => ({ type: LOGIN.LOGOUT_SUCCESS });

export const onRefreshRequest = () => ({ type: LOGIN.REFRESH_REQUEST });

export const onRefreshFailure = () => ({ type: LOGIN.REFRESH_FAILURE });

export const onRefreshSuccess = (user) => ({ type: LOGIN.REFRESH_SUCCESS, user });
