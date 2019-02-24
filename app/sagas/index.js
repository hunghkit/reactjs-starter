import { takeLatest } from 'redux-saga/effects'
import { LOGIN, ADMINCATEGORY, ADMINPOST, APPPOST, APP, ADMINAPP } from 'actions/constants';

import * as APPWATCHER from './app';
import * as LOGINWATCHER from './login';
import * as APPPOSTWATCHER from './post';
import * as ADMINAPPWATCHER from './adminApp';
import * as ADMINPOSTWATCHER from './adminPost';
import * as ADMINCATEGORYWATCHER from './adminCategory';

export default function* root() {
  yield takeLatest(APP.SYSTEM_CONFIG_REQUEST, APPWATCHER.onConfigRequest);

  yield takeLatest(LOGIN.REFRESH_REQUEST, LOGINWATCHER.onRefreshRequest);
  yield takeLatest(LOGIN.SUBMITING_REQUEST, LOGINWATCHER.onSubmitRequest);
  yield takeLatest(LOGIN.LOGOUT_REQUEST, LOGINWATCHER.onLogoutRequest);

  yield takeLatest(APPPOST.APP_POST_DETAIL_REQUEST, APPPOSTWATCHER.onDetailRequest);
  yield takeLatest(APPPOST.APP_POST_SEARCH_REQUEST, APPPOSTWATCHER.onSearchRequest);

  yield takeLatest(ADMINPOST.ADMIN_POST_SEARCH_REQUEST, ADMINPOSTWATCHER.onSearchRequest);
  yield takeLatest(ADMINPOST.ADMIN_POST_CREATE_REQUEST, ADMINPOSTWATCHER.onCreateRequest);
  yield takeLatest(ADMINPOST.ADMIN_POST_DELETE_REQUEST, ADMINPOSTWATCHER.onDeleteRequest);

  yield takeLatest(ADMINAPP.ADMIN_APP_LAYOUT_REQUEST, ADMINAPPWATCHER.onLayoutRequest);
  yield takeLatest(ADMINAPP.ADMIN_APP_LAYOUT_REMOVE_REQUEST, ADMINAPPWATCHER.onLayoutRemoveRequest);
  yield takeLatest(ADMINAPP.ADMIN_APP_LAYOUT_LOADING_REQUEST, ADMINAPPWATCHER.onLayoutLoadingRequest);

  yield takeLatest(ADMINAPP.ADMIN_APP_SETTING_REQUEST, ADMINAPPWATCHER.onSettingRequest);
  yield takeLatest(ADMINAPP.ADMIN_APP_SETTING_LOADING_REQUEST, ADMINAPPWATCHER.onSettingLoadingRequest);

  yield takeLatest(ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_REQUEST, ADMINCATEGORYWATCHER.onSearchRequest);
  yield takeLatest(ADMINCATEGORY.ADMIN_CATEGORY_CREATE_REQUEST, ADMINCATEGORYWATCHER.onCreateRequest);
}
