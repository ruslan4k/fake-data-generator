import {
  SAVE_DATA_GENERATION_EVENT_FAILURE,
  SAVE_DATA_GENERATION_EVENT_SUCCESS,
  SAVE_DATA_GENERATION_EVENT_REQUEST,
  GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
  GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS,
  GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE,
} from './dataGenerationConstants';

// eslint-disable-next-line import/prefer-default-export
export function saveDataGenerationEventRequest({ rowsToGenerateNumber, columns }) {
  return {
    type: SAVE_DATA_GENERATION_EVENT_REQUEST,
    columns,
    rowsToGenerateNumber,
  };
}

export function saveDataGenerationEventSuccess(history) {
  return {
    type: SAVE_DATA_GENERATION_EVENT_SUCCESS,
    history,
  };
}

export function saveDataGenerationEventFailure() {
  return {
    type: SAVE_DATA_GENERATION_EVENT_FAILURE,
  };
}

export function getDataGenerationEventsHistoryRequest() {
  return {
    type: GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
  };
}

export function getDataGenerationEventsHistorySuccess(history) {
  return {
    type: GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS,
    history,
  };
}

export function getDataGenerationEventsHistoryFailure() {
  return {
    type: GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE,
  };
}
