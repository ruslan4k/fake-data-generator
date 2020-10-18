import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { emailValidation, passwordValidation, nameValidation } from '../../constants/validations';
import * as UserActions from '../../state/user/userActions';
import AuthCardWrapper from './AuthCardWrapper';

function SignUp() {
  const dispatch = useDispatch();
  const handleSignUp = (values) => {
    const { email, password, name } = values;
    dispatch(UserActions.registerRequest(email, password, name));
  };

  const signUpSchema = yup.object().shape({
    name: nameValidation,
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: yup
      .string()
      .required('This field is required.')
      .oneOf([yup.ref('password')], 'Passwords not match'),
  });

  const { errors, handleChange, touched, handleBlur, isValid, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signUpSchema,
    onSubmit: handleSignUp,
  });

  const nameError = errors.name && touched.name ? errors.name : null;
  const emailError = errors.email && touched.email ? errors.email : null;
  const passwordError = errors.password && touched.password ? errors.password : null;
  const confirmPasswordError = errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null;
  return (
    <AuthCardWrapper isValid={isValid} handleSubmit={handleSubmit} title="Create An Account" submitButtonLabel="Sign Up">
      <div className="mb-10">
        <TextField
          className="w-full"
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={nameError}
          error={Boolean(nameError)}
          required
        />
      </div>
      <div className="mb-10">
        <TextField
          className="w-full"
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={emailError}
          error={Boolean(emailError)}
          required
        />
      </div>
      <div className="mb-10">
        <TextField
          className="w-full"
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={passwordError}
          error={Boolean(passwordError)}
          required
        />
      </div>
      <TextField
        className="w-full"
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="outlined"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={confirmPasswordError}
        error={Boolean(confirmPasswordError)}
        required
      />
    </AuthCardWrapper>
  );
}

export default SignUp;
