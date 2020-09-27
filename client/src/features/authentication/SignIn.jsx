import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../state/user/userActions';
import { emailValidation, passwordValidation } from '../../constants/validations';

function SignIn() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.getUserRequest());
  }, [dispatch]);

  const handleSignIn = (values) => {
    const { email, password } = values;
    dispatch(UserActions.loginRequest(email, password));
  };

  const signInSchema = yup.object().shape({
    email: emailValidation,
    password: passwordValidation,
  });

  const {
    errors, handleChange, touched, handleBlur, isValid, handleSubmit,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: handleSignIn,
  });

  const emailError = errors.email && touched.email ? errors.email : null;
  const passwordError = errors.password && touched.password ? errors.password : null;

  return (
    <div className="inline-flex flex-col">
      <form onSubmit={handleSubmit}>
        <div className="mb-10">
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={emailError}
            error={Boolean(emailError)}
            required
          />
        </div>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          id="password"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={passwordError}
          error={Boolean(passwordError)}
          required
        />
        <div className="mt-10">
          <Button variant="contained" color="primary" type="submit" disabled={!isValid}>
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
