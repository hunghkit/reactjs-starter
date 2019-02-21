import {
  APP,
  ON_CHANGE_OPEN_KEYS,
} from './constants';

export const onChangeOpenKeys = (payload = {}) => ({ type: ON_CHANGE_OPEN_KEYS, payload });

export const onRouterRequest = (url) => ({ type: APP.ROUTER_REQUEST, url });

export const onRouterFailure = (url) => ({ type: APP.ROUTER_FAILURE, url });

export const onRouterSuccess = (url) => ({ type: APP.ROUTER_SUCCESS, url });

export const onConfigRequest = (cb) => ({ type: APP.SYSTEM_CONFIG_REQUEST, cb });

export const onConfigSuccess = (payload = {}) => ({ type: APP.SYSTEM_CONFIG_SUCCESS, payload });

export const onConfigFailure = (error) => ({ type: APP.SYSTEM_CONFIG_FAILURE, error });
