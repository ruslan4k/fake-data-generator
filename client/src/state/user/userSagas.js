/* eslint-disable no-console */
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as UserActions from './userActions';
import * as UserRequests from './userRequests';
import * as UserConstants from './userConstants';

export function* getUser() {
  try {
    const user = yield call(UserRequests.getUser);
    yield put(UserActions.getUserSuccess(user));
  } catch (err) {
    yield put(UserActions.getUserFailure());
  }
}

export function* login({ email: providedEmail, password }) {
  try {
    const user = yield call(UserRequests.login, providedEmail, password);
    const { email, name } = user;
    yield put(UserActions.loginSuccess(email, name));
  } catch (err) {
    console.error('login -> err', err);
    yield put(UserActions.loginFailure());
  }
}

export default function* () {
  yield takeEvery(UserConstants.GET_USER_REQUEST, getUser);
  yield takeEvery(UserConstants.LOGIN_REQUEST, login);
}
