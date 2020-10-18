import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { useDispatch } from 'react-redux';
import { bool, func, node, string } from 'prop-types';
import * as UserActions from '../../state/user/userActions';

function AuthCardWrapper({ children, handleSubmit, isValid, title, submitButtonLabel }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UserActions.getUserRequest());
  }, [dispatch]);

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
            <div className="w-200 mt-16">
              <div className="flex flex-col">
                <div className="mb-4">
                  <Button
                    className="w-full"
                    href="http://localhost:3600/auth/social/google"
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Login with Google
                  </Button>
                </div>
                <div className="mb-4">
                  <Button
                    className="w-full"
                    href="http://localhost:3600/auth/social/github"
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Login with Github
                  </Button>
                </div>
                <div className="mb-4">
                  <Button
                    className="w-full"
                    href="http://localhost:3600/auth/social/facebook"
                    variant="contained"
                    color="secondary"
                    type="submit"
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
