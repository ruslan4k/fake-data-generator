import { SET_SNACKBAR_MESSAGE } from './globalConstants';

// eslint-disable-next-line import/prefer-default-export
export function showSnackbarMessage({ message, type }) {
  return {
    type: SET_SNACKBAR_MESSAGE,
    message,
    messageType: type,
  };
}

export function hideSnackbarMessage() {
  return {
    type: SET_SNACKBAR_MESSAGE,
    message: '',
    messageType: '',
  };
}
