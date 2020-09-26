import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../helpers/history';
import userReducer from './user/userReducer';
import globalReducer from './global/globalReducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
