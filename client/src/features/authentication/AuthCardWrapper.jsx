import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import { bool, func, node, string } from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { GitHub, Facebook } from '@material-ui/icons';
import * as UserActions from '../../state/user/userActions';
import { API_URL } from '../../constants/configVariables';
import googleIcon from '../../assets/images/googleIcon.svg';

const useStyles = makeStyles(() => ({
  googleButton: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  facebookButton: {
    backgroundColor: 'rgba(59, 89, 152, 1)',
    display: 'flex',
    justifyContent: 'flex-start',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(59, 89, 152, 0.9)',
      boxShadow: 'none',
    },
  },
  githubButton: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(51, 51, 51, 1)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(51, 51, 51, 0.9)',
      boxShadow: 'none',
    },
  },
}));

function AuthCardWrapper({ children, handleSubmit, isValid, title, submitButtonLabel }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.getUserRequest());
  }, [dispatch]);

  const { githubButton, facebookButton, googleButton } = useStyles();
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-400 p-32 flex flex-col justify-center">
        <h1 className="mb-32">{title}</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
          <div className="w-full">{children}</div>
          <div className="mt-24 w-320 flex flex-col justify-center items-center">
            <Button className="w-250" variant="contained" color="primary" type="submit" disabled={!isValid}>
              {submitButtonLabel}
            </Button>
            <div className="w-150 mt-16">
              <div className="flex flex-col">
                <div className="mb-4">
                  <Button
                    classes={{ root: googleButton }}
                    className="w-full flex justify-between"
                    href={`${API_URL}/auth/social/google`}
                    startIcon={<img alt="google icon" style={{ height: 20, width: 20, marginRight: 'auto' }} src={googleIcon} />}
                    variant="outlined"
                  >
                    Login with Google
                  </Button>
                </div>
                <div className="mb-4">
                  <Button
                    startIcon={<GitHub />}
                    classes={{ root: githubButton }}
                    className="w-full"
                    href={`${API_URL}/auth/social/github`}
                    variant="contained"
                  >
                    Login with Github
                  </Button>
                </div>
                <div className="mb-4">
                  <Button
                    startIcon={<Facebook />}
                    classes={{ root: facebookButton }}
                    className="w-full"
                    href={`${API_URL}/auth/social/facebook`}
                    variant="contained"
                  >
                    Login with Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

AuthCardWrapper.propTypes = {
  children: node.isRequired,
  handleSubmit: func.isRequired,
  isValid: bool.isRequired,
  title: string.isRequired,
  submitButtonLabel: string.isRequired,
};

export default AuthCardWrapper;
