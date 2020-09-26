import produce from 'immer';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE, LOGOUT_SUCCESS,
} from './userConstants';

// The initial state of the App
export const initialState = {
  user: null,
  loadingUser: false,
  loadingLogin: false,
  loadingRegister: false,
  isUserFetched: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      draft.loadingUser = true;
      break;
    case GET_USER_SUCCESS:
      draft.user = action.user;
      draft.loadingUser = false;
      draft.isUserFetched = true;
      break;
    case GET_USER_FAILURE:
      draft.loadingUser = false;
      break;
    case LOGIN_REQUEST:
      draft.loadingLogin = true;
      break;
    case LOGIN_SUCCESS:
      draft.user = action.user;
      draft.loadingLogin = false;
      break;
    case LOGIN_FAILURE:
      draft.loadingLogin = false;
      break;
    case REGISTER_REQUEST:
      draft.loadingRegister = true;
      break;
    case REGISTER_SUCCESS:
      draft.user = action.user;
      draft.loadingRegister = false;
      break;
    case REGISTER_FAILURE:
      draft.loadingRegister = false;
      break;
    case LOGOUT_SUCCESS:
      draft.user = null;
      break;
  }
});

export default userReducer;
