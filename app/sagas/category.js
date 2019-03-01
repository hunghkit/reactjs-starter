import axios from 'utils/axios';
import { call, put } from 'redux-saga/effects';
import * as APPCATEGORY from 'actions/category';

export function* onDetailRequest(action) {
  try {
    const { params = {} } = action;
    const { data } = yield call(axios.get, `/posts/category/${params.slug}`);
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(APPCATEGORY.onDetailSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(APPCATEGORY.onDetailFailure((err || '').toString(), (action.params || {}).slug));
    action.cb && (yield call(action.cb, null, err));
  }
}
