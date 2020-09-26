import React from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import * as UserSelectors from '../../state/user/userSelectors';
import * as UserActions from '../../state/user/userActions';

function Header() {
  const user = useSelector((state) => UserSelectors.selectUser(state));
  const isUserFetched = useSelector((state) => UserSelectors.selectUsersFetched(state));
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const handleLogoutUser = () => {
    dispatch(UserActions.logoutRequest());
  };
  return (
    <div className="w-full flex justify-between py-16 px-16">
      {pathname !== '/' && (
        <Link to="/">
          <Button variant="contained" color="primary">
            Home
          </Button>
        </Link>
      )}
      {isUserFetched && (
      <>
        {!user ? (
          <div className="flex ml-auto">
            <div className="mr-16">
              <Link to="/signin">
                <Button variant="contained" color="primary">
                  Sign In
                </Button>
              </Link>
            </div>
            <Link to="/signup">
              <Button variant="contained" color="secondary">
                Sign Up
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center ml-auto">
            <div className="mr-8">
              {user.name}
              {' '}
              {user.email}
            </div>
            <Button variant="contained" onClick={handleLogoutUser}>
              Logout
            </Button>
          </div>
        )}

      </>
      )}

    </div>
  );
}

export default Header;
