/* eslint-disable no-console */
import { call, put, takeEvery } from 'redux-saga/effects';
import * as DataGenerationActions from './dataGenerationActions';
import * as DataGenerationRequests from './dataGenerationRequests';
import * as DataGenerationConstants from './dataGenerationConstants';
import * as GlobalActions from '../global/globalActions';
import { SNACKBAR_TYPES } from '../../constants/snackbarConstants';
import { formatErrorMessage } from '../../helpers/errorsHelpers';

export function* getDataGenerationEventsHistory() {
  try {
    const { history } = yield call(DataGenerationRequests.getDataGenerationEventsHistory);
    yield put(DataGenerationActions.getDataGenerationEventsHistorySuccess(history));
  } catch (err) {
    console.log('function*getDataGenerationEventsHistory -> err', err);
    const message = formatErrorMessage(err);
    yield put(GlobalActions.showSnackbarMessage({ message, type: SNACKBAR_TYPES.ERROR }));
    yield put(DataGenerationActions.getDataGenerationEventsHistoryFailure());
  }
}

export function* generateData({ columns, rowsToGenerateNumber }) {
  try {
    const { generatedData, history } = yield call(DataGenerationRequests.generateData, columns, rowsToGenerateNumber);
    yield put(DataGenerationActions.generateDataRequestSuccess(generatedData, history));
  } catch (err) {
    console.log('function*generateData -> err', err);
    yield put(DataGenerationActions.generateDataRequestFailure());
  }
}

export default function* () {
  yield takeEvery(DataGenerationConstants.GET_DATA_GENERATION_EVENTS_HISTORY_REQUEST, getDataGenerationEventsHistory);
  yield takeEvery(DataGenerationConstants.GENERATE_DATA_REQUEST, generateData);
}
