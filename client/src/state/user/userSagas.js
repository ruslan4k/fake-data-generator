/* eslint-disable no-console */
import {
  call, put, takeEvery,
} from 'redux-saga/effects';
import * as UserActions from './userActions';
import * as UserRequests from './userRequests';
import * as UserConstants from './userConstants';
import * as GlobalActions from '../global/globalActions';
import { SNACKBAR_TYPES } from '../../constants/snackbarConstants';
import history from '../../helpers/history';
import { formatErrorMessage } from '../../helpers/errorsHelpers';

export function* getUser() {
  try {
    const { user } = yield call(UserRequests.getUser);
    yield put(UserActions.getUserSuccess(user));
  } catch (err) {
    console.log('function*getUser -> err', err);
    const message = formatErrorMessage(err);
    yield put(GlobalActions.showSnackbarMessage({ message, type: SNACKBAR_TYPES.ERROR }));
    yield put(UserActions.getUserFailure());
  }
}

export function* login({ email: providedEmail, password }) {
  try {
    const { user } = yield call(UserRequests.login, providedEmail, password);
    yield put(UserActions.loginSuccess(user));
    yield put(GlobalActions.showSnackbarMessage({ message: 'Successfully signed in!', type: SNACKBAR_TYPES.SUCCESS }));
    history.push('/');
  } catch (err) {
    console.log('function*login -> err', err);
    const message = formatErrorMessage(err);
    yield put(GlobalActions.showSnackbarMessage({ message, type: SNACKBAR_TYPES.ERROR }));
    yield put(UserActions.loginFailure());
  }
}

export function* register({ email: providedEmail, password, name }) {
  try {
    const { user } = yield call(UserRequests.register, providedEmail, password, name);
    yield put(UserActions.registerSuccess(user));
    yield put(GlobalActions.showSnackbarMessage({ message: 'Successfully signed up!', type: SNACKBAR_TYPES.SUCCESS }));
    history.push('/');
  } catch (err) {
    console.log('function*register -> err', err);
    const message = formatErrorMessage(err);
    yield put(GlobalActions.showSnackbarMessage({ message, type: SNACKBAR_TYPES.ERROR }));
    yield put(UserActions.registerFailure());
  }
}

export function* logout() {
  try {
    const user = yield call(UserRequests.logout);
    yield put(UserActions.logoutSuccess(user));
    yield put(GlobalActions.showSnackbarMessage({ message: 'Successfully logged out!', type: SNACKBAR_TYPES.SUCCESS }));
  } catch (err) {
    console.log('function*logout -> err', err);
    const message = formatErrorMessage(err);
    yield put(GlobalActions.showSnackbarMessage({ message, type: SNACKBAR_TYPES.ERROR }));
    yield put(UserActions.logoutFailure());
  }
}

export default function* () {
  yield takeEvery(UserConstants.GET_USER_REQUEST, getUser);
  yield takeEvery(UserConstants.LOGIN_REQUEST, login);
  yield takeEvery(UserConstants.REGISTER_REQUEST, register);
  yield takeEvery(UserConstants.LOGOUT_REQUEST, logout);
}
