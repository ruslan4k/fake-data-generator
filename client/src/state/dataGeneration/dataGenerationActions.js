import {
  GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
  GET_DATA_GENERATION_EVENTS_HISTORY_SUCCESS,
  GET_DATA_GENERATION_EVENTS_HISTORY_FAILURE,
  GENERATE_DATA_FAILURE,
  GENERATE_DATA_SUCCESS,
  GENERATE_DATA_REQUEST,
  RESET_GENERATED_DATA,
} from './dataGenerationConstants';

// eslint-disable-next-line import/prefer-default-export

export function getDataGenerationEventsHistoryRequest(page, callback) {
  return {
    type: GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST,
    page,
    callback,
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

export function generateDataRequest(columns, rowsToGenerateNumber) {
  return {
    type: GENERATE_DATA_REQUEST,
    columns,
    rowsToGenerateNumber,
  };
}

export function generateDataRequestSuccess(generatedData, history) {
  return {
    type: GENERATE_DATA_SUCCESS,
    generatedData,
    history,
  };
}

export function generateDataRequestFailure() {
  return {
    type: GENERATE_DATA_FAILURE,
  };
}
export function resetGeneratedData() {
  return {
    type: RESET_GENERATED_DATA,
  };
}
