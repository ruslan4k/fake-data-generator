import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../helpers/history';
import userReducer from './user/userReducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: userReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
