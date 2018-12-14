import { ADMINCATEGORY } from './constants';

export const onCreateRequest = (params = {}, cb) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_CREATE_REQUEST, category: params, cb });
export const onCreateFailure = (message) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_CREATE_FAILURE, message });
export const onCreateSuccess = (category = {}) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_CREATE_SUCCESS, category });

export const onDeleteRequest = (uuid, cb) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_DELETE_REQUEST, uuid, cb });
export const onDeleteFailure = (message) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_DELETE_FAILURE, message });
export const onDeleteSuccess = (payload = {}) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_DELETE_SUCCESS, payload });

export const onUpdateRequest = (uuid, params = {}, cb) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_UPDATE_REQUEST, params, uuid, cb });
export const onUpdateFailure = (message) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_UPDATE_FAILURE, message });
export const onUpdateSuccess = (payload = {}) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_UPDATE_SUCCESS, payload });

export const onSearchRequest = (params = {}, mode = 'post', cb) => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_REQUEST, mode, params, cb });
export const onSearchFailure = (message, mode = 'post') => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_FAILURE, message, mode });
export const onSearchSuccess = (payload = {}, mode = 'post') => ({ type: ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_SUCCESS, payload, mode });
