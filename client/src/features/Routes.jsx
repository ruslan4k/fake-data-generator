import React, { useEffect } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DataGeneratorPage from './dataGenerator/containers/DataGeneratorPage';
import SignIn from './authentication/SignIn';
import SignUp from './authentication/SignUp';
import Header from './layout/Header';
import HistoryPage from './history/containers/HistoryPage';
import SnackbarComponent from '../baseComponents/Snackbar';
import { getUserRequest } from '../state/user/userActions';

function Routes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  return (
    <>
      <SnackbarComponent />
      <Header />
      <Switch>
        <Route exact path="/">
          <DataGeneratorPage />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/history">
          <HistoryPage />
        </Route>
      </Switch>
    </>

  );
}

export default Routes;
