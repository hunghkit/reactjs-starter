import axios from 'utils/axios';
import Router from 'next/router'
import { call, put } from 'redux-saga/effects';
import * as ADMINPOST from 'actions/adminPost';

export function* onSearchRequest(action) {
  try {
    const { params = {} } = action;

    const { data } = yield call(axios.get, '/admin/posts', { params });
    const { success, payload, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINPOST.onSearchSuccess(payload));
    action.cb && (yield call(action.cb, payload));
  } catch (err) {
    yield put(ADMINPOST.onSearchFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onCreateRequest(action) {
  try {
    const { data } = yield call(axios.post, '/admin/posts', action);
    const { success, post, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINPOST.onCreateSuccess(post));
    Router.push('/admin/posts');
    action.cb && (yield call(action.cb, post));
  } catch (err) {
    yield put(ADMINPOST.onCreateFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}

export function* onDeleteRequest(action) {
  try {
    const { data } = yield call(axios.delete, `/admin/posts/${action.uuid}`);
    const { success, post, message } = data || {};

    if (!success) {
      throw message;
    }

    yield put(ADMINPOST.onDeleteSuccess(post));
    action.cb && (yield call(action.cb, post));
  } catch (err) {
    yield put(ADMINPOST.onDeleteFailure((err || '').toString()));
    action.cb && (yield call(action.cb, null, err));
  }
}
