import { ADMINAPP } from './constants';

export const onLayoutRequest = (params = {}, mode = 'header', cb) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_REQUEST, layout: params, mode, cb });
export const onLayoutFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_FAILURE, message });
export const onLayoutSuccess = (layout = {}, mode = 'header') => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_SUCCESS, layout, mode });

export const onLayoutLoadingRequest = (mode = 'all', cb) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_LOADING_REQUEST, mode, cb });
export const onLayoutLoadingFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_LOADING_FAILURE, message });
export const onLayoutLoadingSuccess = (layout = {}, mode = 'all') => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_LOADING_SUCCESS, layout, mode });

export const onLayoutRemoveRequest = (uuid, mode = 'menus', cb) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_REMOVE_REQUEST, uuid, mode, cb });
export const onLayoutRemoveFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_REMOVE_FAILURE, message });
export const onLayoutRemoveSuccess = (uuid, mode = 'menus') => ({ type: ADMINAPP.ADMIN_APP_LAYOUT_REMOVE_SUCCESS, uuid, mode });

export const onBlockRequest = (params = {}, cb) => ({ type: ADMINAPP.ADMIN_APP_BLOCK_REQUEST, block: params, cb });
export const onBlockFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_BLOCK_FAILURE, message });
export const onBlockSuccess = (block = {}) => ({ type: ADMINAPP.ADMIN_APP_BLOCK_SUCCESS, block });

export const onSettingRequest = (params = {}, cb) => ({ type: ADMINAPP.ADMIN_APP_SETTING_REQUEST, setting: params, cb });
export const onSettingFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_SETTING_FAILURE, message });
export const onSettingSuccess = (setting = {}) => ({ type: ADMINAPP.ADMIN_APP_SETTING_SUCCESS, setting });

export const onSettingLoadingRequest = (cb) => ({ type: ADMINAPP.ADMIN_APP_SETTING_LOADING_REQUEST, cb });
export const onSettingLoadingFailure = (message) => ({ type: ADMINAPP.ADMIN_APP_SETTING_LOADING_FAILURE, message });
export const onSettingLoadingSuccess = (setting = {}) => ({ type: ADMINAPP.ADMIN_APP_SETTING_LOADING_SUCCESS, setting });

