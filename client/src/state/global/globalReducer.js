import produce from 'immer';
import { SET_SNACKBAR_MESSAGE } from './globalConstants';

// The initial state of the App
export const initialState = {
  snackbarMessage: null,
  snackbarMessageType: null,
};

/* eslint-disable default-case, no-param-reassign */
const layoutReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_SNACKBAR_MESSAGE:
        draft.snackbarMessage = action.message;
        draft.snackbarMessageType = action.messageType;
        break;
    }
  });

export default layoutReducer;
