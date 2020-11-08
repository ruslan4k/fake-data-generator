import produce from 'immer';
import { v4 as uuid } from 'uuid';
import {
  GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE,
  GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS,
  GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
  GENERATE_DATA_FAILURE,
  GENERATE_DATA_REQUEST,
  GENERATE_DATA_SUCCESS,
  RESET_GENERATED_DATA,
} from './dataGenerationConstants';
import { LOGOUT_SUCCESS } from '../user/userConstants';

import { FIRST_NAME, LAST_NAME, EMAIL, NUMBER } from '../../constants/dataTypes';

const initialGeneratedDataState = {
  rows: [],
  columns: [
    { columnName: 'firstName', columnType: FIRST_NAME, id: uuid(), options: {} },
    { columnName: 'lastName', columnType: LAST_NAME, id: uuid(), options: {} },
    { columnName: 'email', columnType: EMAIL, id: uuid(), options: {} },
    { columnName: 'number', columnType: NUMBER, id: uuid(), options: {} },
  ],
  loadingGeneratedData: false,
};

// The initial state of the App
export const initialState = {
  dataGenerationEventsHistory: {
    items: [],
    itemsCount: 0,
    limit: 10,
  },
  loadingDataGenerationEventsHistory: false,
  generatedData: initialGeneratedDataState,
  isHistoryFetched: false,
};

/* eslint-disable default-case, no-param-reassign */
const layoutReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (draft) => {
    switch (action.type) {
      case GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST:
        draft.loadingDataGenerationEventsHistory = true;
        break;
      case GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS:
        draft.dataGenerationEventsHistory = action.history;
        draft.isHistoryFetched = true;
        draft.loadingDataGenerationEventsHistory = false;
        break;
      case GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE:
        draft.loadingDataGenerationEventsHistory = false;
        break;
      case GENERATE_DATA_REQUEST:
        draft.generatedData.loadingGeneratedData = true;
        break;
      case GENERATE_DATA_SUCCESS:
        if (action.history) {
          draft.dataGenerationEventsHistory = action.history;
          if (action.history.length) draft.isHistoryFetched = true;
        }
        draft.generatedData = action.generatedData;
        draft.generatedData.loadingGeneratedData = false;
        draft.history = action.history;
        break;
      case GENERATE_DATA_FAILURE:
        draft.generatedData.loadingGeneratedData = false;
        break;
      case RESET_GENERATED_DATA:
        draft.generatedData = initialGeneratedDataState;
        break;
      case LOGOUT_SUCCESS:
        return initialState;
    }
  });

export default layoutReducer;
