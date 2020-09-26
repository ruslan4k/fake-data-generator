import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST,
} from './userConstants';

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserFailure() {
  return {
    type: GET_USER_FAILURE,
  };
}

export function loginRequest(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}
