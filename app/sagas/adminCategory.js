import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as ADMINCATEGORY from 'actions/adminCategory';

export function* onSearchRequest(action) {
  try {
    const { params = {}, mode = 'post' } = action;
    params.mode = mode;

    const { data } = yield call(axios.get, '/api/v1.0.0/admin/categories', { params });
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINCATEGORY.onSearchSuccess(payload, mode));
    action.cb && (yield call(action.cb, payload, mode));
  } catch (err) {
    yield put(ADMINCATEGORY.onSearchFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onCreateRequest(action) {
  try {
    const { data } = yield call(axios.post, '/api/v1.0.0/admin/categories', action);
    const { success, category, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINCATEGORY.onCreateSuccess(category));
    action.cb && (yield call(action.cb, category));
  } catch (err) {
    yield put(ADMINCATEGORY.onCreateFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}
