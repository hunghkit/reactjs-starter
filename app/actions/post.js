import { APPPOST } from './constants';

export const onSearchRequest = (params = {}, cb) => ({ type: APPPOST.APP_POST_SEARCH_REQUEST, params, cb });
export const onSearchFailure = (message) => ({ type: APPPOST.APP_POST_SEARCH_FAILURE, message });
export const onSearchSuccess = (payload = {}) => ({ type: APPPOST.APP_POST_SEARCH_SUCCESS, payload });

export const onDetailRequest = (params = {}, cb) => ({ type: APPPOST.APP_POST_DETAIL_REQUEST, params, cb });
export const onDetailFailure = (message) => ({ type: APPPOST.APP_POST_DETAIL_FAILURE, message });
export const onDetailSuccess = (payload = {}) => ({ type: APPPOST.APP_POST_DETAIL_SUCCESS, payload });
