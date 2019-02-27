import axios from 'utils/axios';
import { call, put } from 'redux-saga/effects';
import * as ADMINAPP from 'actions/adminApp';

export function* onSettingLoadingRequest(action) {
  try {
    const { data } = yield call(axios.get, '/admin/settings', action);
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINAPP.onSettingSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(ADMINAPP.onSettingFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onSettingRequest(action) {
  try {
    const isNew = !(action.setting || {}).uuid;
    const { data } = yield call(axios[isNew ? 'post' : 'put'], `/admin/settings/${isNew ? '' : action.setting.uuid}`, action);
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINAPP.onSettingSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(ADMINAPP.onSettingFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onLayoutLoadingRequest(action) {
  try {
    const { data } = yield call(axios.get, '/admin/layouts', { params: action });
    const { success, payload, mode = 'header', message } = data || {};

    if (!success) {
      throw message;
    }

    if (mode === 'all') {
      yield put(ADMINAPP.onLayoutLoadingSuccess(payload));
    } else {
      yield put(ADMINAPP.onLayoutSuccess(payload));
    }

    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    if (action.mode === 'all') {
      yield put(ADMINAPP.onLayoutLoadingFailure((err || '').toString()));
    } else {
      yield put(ADMINAPP.onLayoutFailure((err || '').toString()));
    }
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onLayoutRequest(action) {
  try {
    const isNew = !(action.layout || {}).uuid;
    const { data } = yield call(axios[isNew ? 'post' : 'put'], `/admin/layouts/${isNew ? '' : action.layout.uuid}`, action);
    const { success, payload, mode = 'header', message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINAPP.onLayoutSuccess(payload, mode));
    action.cb && (yield call(action.cb, payload, mode));
  } catch (err) {
    yield put(ADMINAPP.onLayoutFailure((err || '').toString(), action.mode));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onLayoutRemoveRequest(action) {
  try {
    const { data } = yield call(axios.delete, `/admin/layouts/${action.uuid}`, { params: { mode: action.mode } });
    const { success, payload, mode = 'menus', message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINAPP.onLayoutRemoveSuccess(payload, mode));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(ADMINAPP.onLayoutRemoveFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}
