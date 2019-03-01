import axios from 'utils/axios';
import { call, put } from 'redux-saga/effects';
import * as APPAUTHOR from 'actions/author';

export function* onDetailRequest(action) {
  try {
    const { params = {} } = action;
    const { data } = yield call(axios.get, `/posts/author/${params.slug}`);
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(APPAUTHOR.onDetailSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(APPAUTHOR.onDetailFailure((err || '').toString(), (action.params || {}).slug));
    action.cb && (yield call(action.cb, null, err));
  }
}
