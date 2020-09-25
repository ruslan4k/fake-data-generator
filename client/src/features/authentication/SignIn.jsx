import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function SignIn() {
  return (
    <div className="inline-flex flex-col">

      <div className="mb-10">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
        />
      </div>
      <TextField
        label="Password"
        type="password"
        variant="outlined"
      />
      <div className="mt-10">
        <Button variant="contained" color="primary">Sign In</Button>
      </div>
    </div>
  );
}

export default SignIn;
