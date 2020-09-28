import produce from 'immer';
import {
  GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE,
  GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS,
  GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
  SAVE_DATA_GENERATION_EVENT_REQUEST,
  SAVE_DATA_GENERATION_EVENT_SUCCESS,
  SAVE_DATA_GENERATION_EVENT_FAILURE,
} from './dataGenerationConstants';
import {
  LOGOUT_SUCCESS,
} from '../user/userConstants';

// The initial state of the App
export const initialState = {
  dataGenerationEventsHistory: [],
  loadingDataGenerationEventsHistory: false,
  loadingSaveDataGenerationEvent: false,
};

/* eslint-disable default-case, no-param-reassign */
const layoutReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST:
      draft.loadingDataGenerationEventsHistory = true;
      break;
    case GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS:
      draft.dataGenerationEventsHistory = action.history;
      draft.loadingDataGenerationEventsHistory = false;
      break;
    case GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE:
      draft.loadingDataGenerationEventsHistory = false;
      break;
    case SAVE_DATA_GENERATION_EVENT_REQUEST:
      draft.loadingSaveDataGenerationEvent = true;
      break;
    case SAVE_DATA_GENERATION_EVENT_SUCCESS:
      if (action.history) draft.dataGenerationEventsHistory = action.history;
      draft.loadingSaveDataGenerationEvent = false;
      break;
    case SAVE_DATA_GENERATION_EVENT_FAILURE:
      draft.loadingSaveDataGenerationEvent = false;
      break;
    case LOGOUT_SUCCESS:
      return initialState;
  }
});

export default layoutReducer;
