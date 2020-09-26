import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import DataGeneratorPage from './features/dataGenerator/containers/DataGeneratorPage';
import SignIn from './features/authentication/SignIn';
import SignUp from './features/authentication/SignUp';
import Header from './features/layout/Header';
import SnackbarComponent from './baseComponents/Snackbar';
import configureStore from './state/configureStore';
import history from './helpers/history';

import './App.css';

function App() {
  const initialState = {};
  const store = configureStore(initialState, history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
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
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
