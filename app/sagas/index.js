import { takeLatest } from 'redux-saga/effects'
import { LOGIN, ADMINCATEGORY, ADMINPOST } from 'actions/constants';

import * as LOGINWATCHER from './login';
import * as ADMINPOSTWATCHER from './adminPost';
import * as ADMINCATEGORYWATCHER from './adminCategory';

export default function* root() {
  yield takeLatest(LOGIN.REFRESH_REQUEST, LOGINWATCHER.onRefreshRequest);
  yield takeLatest(LOGIN.SUBMITING_REQUEST, LOGINWATCHER.onSubmitRequest);
  yield takeLatest(LOGIN.LOGOUT_REQUEST, LOGINWATCHER.onLogoutRequest);

  yield takeLatest(ADMINPOST.ADMIN_POST_SEARCH_REQUEST, ADMINPOSTWATCHER.onSearchRequest);
  yield takeLatest(ADMINPOST.ADMIN_POST_CREATE_REQUEST, ADMINPOSTWATCHER.onCreateRequest);
  yield takeLatest(ADMINPOST.ADMIN_POST_DELETE_REQUEST, ADMINPOSTWATCHER.onDeleteRequest);

  yield takeLatest(ADMINCATEGORY.ADMIN_CATEGORY_SEARCH_REQUEST, ADMINCATEGORYWATCHER.onSearchRequest);
  yield takeLatest(ADMINCATEGORY.ADMIN_CATEGORY_CREATE_REQUEST, ADMINCATEGORYWATCHER.onCreateRequest);
}
