import React, { useState } from 'react';
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
import SnackbarComponent, { SnackbarContext } from './baseComponents/Snackbar';
import configureStore from './state/configureStore';
import history from './helpers/history';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const initialState = {};
  const store = configureStore(initialState, history);
  const handleShowMessage = ({ message, type }) => {
    setOpen(true);
    if (message) setSnackbarMessage(message);
    if (type) setSnackbarType(type);
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      setOpen(false);
    }
    setOpen(false);
  };

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarComponent
          handleShowMessage={handleShowMessage}
          handleCloseMessage={handleCloseMessage}
          open={open}
          message={snackbarMessage}
          type={snackbarType}
        />
        <div className="App">
          <SnackbarContext.Provider
            value={{
              handleShowMessage,
              handleCloseMessage,
            }}
          >
            <Header />
            <Switch>
              <Route exact path="/">
                <DataGeneratorPage handleShowMessage={handleShowMessage} />
              </Route>
              <Route exact path="/signin">
                <SignIn />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </SnackbarContext.Provider>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
