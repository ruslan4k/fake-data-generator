import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../state/user/userActions';
import useHandleTextInput from '../../customHooks/useHandleTextInput';

function SignIn() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.getUserRequest());
  }, [dispatch]);
  const { value: password, handleChangeValue: handleChangePassword } = useHandleTextInput();
  const { value: email, handleChangeValue: handleChangeEmail } = useHandleTextInput();
  const handleSignIn = async () => {
    dispatch(UserActions.loginRequest(email, password));
  };
  return (
    <div className="inline-flex flex-col">

      <div className="mb-10">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        password={password}
        onChange={handleChangePassword}
      />
      <div className="mt-10">
        <Button onClick={handleSignIn} variant="contained" color="primary">Sign In</Button>
      </div>
    </div>
  );
}

export default SignIn;
