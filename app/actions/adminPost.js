import { ADMINPOST } from './constants';

export const onCreateRequest = (params = {}, cb) => ({ type: ADMINPOST.ADMIN_POST_CREATE_REQUEST, post: params, cb });
export const onCreateFailure = (message) => ({ type: ADMINPOST.ADMIN_POST_CREATE_FAILURE, message });
export const onCreateSuccess = (post = {}) => ({ type: ADMINPOST.ADMIN_POST_CREATE_SUCCESS, post });

export const onDeleteRequest = (uuid, cb) => ({ type: ADMINPOST.ADMIN_POST_DELETE_REQUEST, uuid, cb });
export const onDeleteFailure = (message) => ({ type: ADMINPOST.ADMIN_POST_DELETE_FAILURE, message });
export const onDeleteSuccess = (payload = {}) => ({ type: ADMINPOST.ADMIN_POST_DELETE_SUCCESS, payload });

export const onUpdateRequest = (uuid, params = {}, cb) => ({ type: ADMINPOST.ADMIN_POST_UPDATE_REQUEST, params, uuid, cb });
export const onUpdateFailure = (message) => ({ type: ADMINPOST.ADMIN_POST_UPDATE_FAILURE, message });
export const onUpdateSuccess = (payload = {}) => ({ type: ADMINPOST.ADMIN_POST_UPDATE_SUCCESS, payload });

export const onSearchRequest = (params = {}, cb) => ({ type: ADMINPOST.ADMIN_POST_SEARCH_REQUEST, params, cb });
export const onSearchFailure = (message) => ({ type: ADMINPOST.ADMIN_POST_SEARCH_FAILURE, message });
export const onSearchSuccess = (payload = {}) => ({ type: ADMINPOST.ADMIN_POST_SEARCH_SUCCESS, payload });
