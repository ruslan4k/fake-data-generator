import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as UserActions from '../../state/user/userActions';
import useHandleTextInput from '../../customHooks/useHandleTextInput';

function SignUp() {
  const dispatch = useDispatch();
  const { value: password, handleChangeValue: handleChangePassword } = useHandleTextInput();
  const { value: email, handleChangeValue: handleChangeEmail } = useHandleTextInput();
  const { value: name, handleChangeValue: handleChangeName } = useHandleTextInput();
  const handleSignUp = async () => {
    dispatch(UserActions.registerRequest(email, password, name));
  };
  return (
    <div className="inline-flex flex-col">
      <div className="mb-10">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <div className="mb-10">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
        />
      </div>
      <div className="mb-10">
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={handleChangePassword}
      />
      <div className="mt-10">
        <Button variant="contained" color="secondary" onClick={handleSignUp}>Sign Up</Button>
      </div>
    </div>
  );
}

export default SignUp;
