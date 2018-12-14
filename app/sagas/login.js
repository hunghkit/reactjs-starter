import axios from 'axios';
import Cookie from 'js-cookie';
import { call, put } from 'redux-saga/effects';
import * as LOGIN from 'actions/login';

export function* onRefreshRequest(action) {
  try {
    const { data } = yield call(axios.get, '/api/v1.0.0/auth');
    const { success, user, message } = data || {};

    if (!success) {
      throw message;
    }

    Cookie.set('token', user.token, { expires: 360 * 100 });

    yield put(LOGIN.onRefreshSuccess(user));
    action.cb && (yield call(action.cb, user));
  } catch (err) {
    yield put(LOGIN.onRefreshFailure((err || '').toString()));
  }
}

export function* onSubmitRequest(action) {
  try {
    const { data } = yield call(axios.post, '/api/v1.0.0/auth/signin', action);
    const { success, user, message } = data || {};

    if (!success) {
      throw message;
    }

    Cookie.set('token', user.token, { expires: 360 * 100 });
    yield put(LOGIN.onSubmitSuccess(user));
    action.cb && (yield call(action.cb, user));
  } catch (err) {
    yield put(LOGIN.onSubmitFailure((err || '').toString()));
  }
}

export function* onLogoutRequest() {
  Cookie.remove('token');
  yield put(LOGIN.onLogoutSuccess());
}
