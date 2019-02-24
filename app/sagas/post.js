import axios from 'utils/axios';
import { call, put } from 'redux-saga/effects';
import * as APPPOST from 'actions/post';

export function* onSearchRequest(action) {
  try {
    const { params = {} } = action;
    const { data } = yield call(axios.get, '/posts', { params });
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(APPPOST.onSearchSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(APPPOST.onSearchFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onDetailRequest(action) {
  try {
    const { params = {} } = action;
    const { data } = yield call(axios.get, `/posts/${params.slug}`);
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(APPPOST.onDetailSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(APPPOST.onDetailFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}
