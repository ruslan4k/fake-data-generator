import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
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
  const [tabIndex, setTabIndex] = React.useState(false);
  const user = useSelector((state) => UserSelectors.selectUser(state));
  const isLoggedIn = useSelector((state) => UserSelectors.selectLoggedInStatus(state));
  const isUserFetched = useSelector((state) => UserSelectors.selectUsersFetched(state));
  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;
  useEffect(() => {
    let activeTabIndex = null;
    const activeTab = tabs.find((tab, index) => {
      const isMatched = tab.path === pathname;
      if (isMatched) activeTabIndex = index;
      return tab.path === pathname;
    });

    if (!activeTab) {
      setTabIndex(false);
    } else {
      setTabIndex(activeTabIndex);
    }
  }, [pathname, tabs]);

  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(UserActions.logoutRequest());
  };

  const handleChange = (event, newValue) => {
    const tab = tabs[newValue];
    const { path } = tab;
    history.push(path);
  };
  return (
    <>
      <AppBar color="default" className="h-48">
        <div className="w-full flex justify-between items-center px-0 sm:px-16">
          <Tabs
            value={tabIndex}
            indicatorColor="secondary"
            textColor="secondary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            {tabs.map(({ label }) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
          {isUserFetched && (
            <div className="mr-8 sm:mr-0">
              {!isLoggedIn ? (
                <div className="flex ml-auto text-8 sm:text-14">
                  {pathname !== '/signin' && (
                    <div className="ml-16">
                      <Link to="/signin">
                        <Button classes={{ label: 'text-8 sm:text-14' }} variant="outlined">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}
                  {pathname !== '/signup' && (
                    <div className="ml-8">
                      <Link to="/signup">
                        <Button classes={{ label: 'text-8 sm:text-14' }} variant="outlined">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center ml-auto">
                  <div className="text-14 hidden sm:block mr-16">{user.name}</div>
                  <Button variant="contained" onClick={handleLogoutUser}>
                    Logout
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </AppBar>
      <div className="h-48" />
    </>
  );
}

export default Header;
