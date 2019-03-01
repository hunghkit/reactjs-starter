import { APPAUTHOR } from './constants';

export const onDetailRequest = (params = {}, cb) => ({ type: APPAUTHOR.APP_AUTHOR_DETAIL_REQUEST, params, cb });
export const onDetailFailure = (message, slug) => ({ type: APPAUTHOR.APP_AUTHOR_DETAIL_FAILURE, message, slug });
export const onDetailSuccess = (payload = {}) => ({ type: APPAUTHOR.APP_AUTHOR_DETAIL_SUCCESS, payload });
