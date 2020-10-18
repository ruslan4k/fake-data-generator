import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
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

export function registerRequest(email, password, name) {
  return {
    type: REGISTER_REQUEST,
    email,
    password,
    name,
  };
}

export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user,
  };
}

export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure() {
  return {
    type: LOGOUT_FAILURE,
  };
}
