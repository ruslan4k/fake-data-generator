import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SignUp() {
  return (
    <div className="inline-flex flex-col">
      <div className="mb-10">
        <TextField
          label="Name"
          variant="outlined"
        />
      </div>
      <div className="mb-10">
        <TextField
          label="Email"
          type="email"
          variant="outlined"
        />
      </div>
      <div className="mb-10">
        <TextField
          label="Password"
          type="password"
          variant="outlined"
        />
      </div>
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
      />
      <div className="mt-10">
        <Button variant="contained" color="primary">Sign In</Button>
      </div>
    </div>
  );
}

export default SignUp;
