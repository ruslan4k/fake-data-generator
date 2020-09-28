import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../helpers/history';
import userReducer from './user/userReducer';
import dataGenerationReducer from './dataGeneration/dataGenerationReducer';
import globalReducer from './global/globalReducer';

export default function createReducer() {
  const rootReducer = combineReducers({
    user: userReducer,
    dataGeneration: dataGenerationReducer,
    global: globalReducer,
    router: connectRouter(history),
  });

  return rootReducer;
}
