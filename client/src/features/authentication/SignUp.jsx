import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { emailValidation, passwordValidation, nameValidation } from '../../constants/validations';
import * as UserActions from '../../state/user/userActions';

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

  return (
    <div className="inline-flex flex-col">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpSchema}
        onSubmit={handleSignUp}
      >
        {(
          {
            errors, handleChange, touched, handleBlur,
          },

        ) => {
          const nameError = errors.name && touched.name ? errors.name : null;
          const emailError = errors.email && touched.email ? errors.email : null;
          const passwordError = errors.password && touched.password ? errors.password : null;
          const confirmPasswordError = errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null;
          return (
            <Form>
              <div className="mb-10">
                <TextField
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
              <div className="mt-10">
                <Button type="submit" variant="contained" color="secondary">
                  Sign Up
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignUp;
