import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../state/user/userActions';
import { emailValidation, passwordValidation } from '../../constants/validations';
import AuthCardWrapper from './AuthCardWrapper';

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

  const { errors, handleChange, touched, handleBlur, isValid, handleSubmit } = useFormik({
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
    <AuthCardWrapper isValid={isValid} handleSubmit={handleSubmit} title="Login To Your Account" submitButtonLabel="Login">
      <div className="mb-10 w-full">
        <TextField
          className="w-full"
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
        className="w-full"
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
    </AuthCardWrapper>
  );
}

export default SignIn;
