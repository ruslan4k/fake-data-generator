import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import * as GlobalSelectors from '../state/global/globalSelectors';
import * as GlobalActions from '../state/global/globalActions';

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarComponent() {
  const dispatch = useDispatch();
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      dispatch(GlobalActions.hideSnackbarMessage());
    }
    dispatch(GlobalActions.hideSnackbarMessage());
  };
  const { message, type } = useSelector((state) => GlobalSelectors.selectSnackbarMessage(state));
  const isMessage = Boolean(message);

  return (
    <>
      <Snackbar open={isMessage} autoHideDuration={3000} onClose={handleCloseMessage}>
        {isMessage && (
          <Alert classes={{ root: 'flex items-center' }} onClose={handleCloseMessage} severity={type}>
            {message}
          </Alert>
        )}
      </Snackbar>
    </>
  );
}

export default SnackbarComponent;
