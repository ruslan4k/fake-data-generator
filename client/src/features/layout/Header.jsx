import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import * as UserSelectors from '../../state/user/userSelectors';
import * as UserActions from '../../state/user/userActions';

function Header() {
  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/history', label: 'History' },
  ];
  const pathNames = tabs.map((tab) => tab.path);
  const [value, setValue] = React.useState(0);
  const user = useSelector((state) => UserSelectors.selectUser(state));
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  useEffect(() => {
    const isActiveTab = pathNames.includes(pathname);
    if (!isActiveTab) setValue(false);
  }, [pathname]);
  const isUserFetched = useSelector((state) => UserSelectors.selectUsersFetched(state));

  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(UserActions.logoutRequest());
  };

  const handleChange = (event, newValue) => {
    const tab = tabs[newValue];
    const { path } = tab;
    history.push(path);
    setValue(newValue);
  };
  return (
    <div className="w-full flex justify-between py-16 px-16">
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
        {tabs.map(({ label }) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      {isUserFetched && (
        <>
          {!user ? (
            <div className="flex ml-auto">

              {pathname !== '/signin' && (
                <div className="ml-16">
                  <Link to="/signin">
                    <Button variant="contained" color="primary">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
              {pathname !== '/signup' && (
              <div className="ml-16">
                <Link to="/signup">
                  <Button variant="contained" color="secondary">
                    Sign Up
                  </Button>
                </Link>
              </div>
              )}
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
