import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  inputStyles: {
    padding: '12px 10px',
  },
});

function InputField(props) {
  const { inputStyles } = useStyles();
  return (
    <TextField
      InputProps={{ classes: { input: inputStyles } }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />

  );
}

export default InputField;
