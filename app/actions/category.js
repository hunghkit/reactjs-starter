import { APPCATEGORY } from './constants';

export const onDetailRequest = (params = {}, cb) => ({ type: APPCATEGORY.APP_CATEGORY_DETAIL_REQUEST, params, cb });
export const onDetailFailure = (message, slug) => ({ type: APPCATEGORY.APP_CATEGORY_DETAIL_FAILURE, message, slug });
export const onDetailSuccess = (payload = {}) => ({ type: APPCATEGORY.APP_CATEGORY_DETAIL_SUCCESS, payload });
