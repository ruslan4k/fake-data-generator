import React, { createContext } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { bool, func, string } from 'prop-types';
import { SNACKBAR_TYPES } from '../constants/snackbarConstants';

export const SnackbarContext = createContext();
// https://kentcdodds.com/blog/how-to-use-react-context-effectively

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnackbarComponent({
  handleCloseMessage, open, message, type,
}) {
  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleCloseMessage}>
        <Alert classes={{ root: 'flex items-center' }} onClose={handleCloseMessage} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

SnackbarComponent.propTypes = {
  handleCloseMessage: func.isRequired,
  open: bool.isRequired,
  message: string,
  type: string,
};

SnackbarComponent.defaultProps = {
  message: '',
  type: SNACKBAR_TYPES.ERROR,
};

export default SnackbarComponent;
