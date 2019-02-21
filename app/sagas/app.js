import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import * as APP from 'actions/app';

export function* onConfigRequest(action) {
  try {
    const { data } = yield call(axios.get, '/config');
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(APP.onConfigSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(APP.onConfigFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}
