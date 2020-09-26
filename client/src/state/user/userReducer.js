import produce from 'immer';
import {
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from './userConstants';

// The initial state of the App
export const initialState = {
  user: null,
  loadingUser: false,
  loadingLogin: false,
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
  }
});

export default userReducer;
