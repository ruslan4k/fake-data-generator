import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DataGeneratorPage from './features/dataGenerator/containers/DataGeneratorPage';
import SignIn from './features/authentication/SignIn';
import SignUp from './features/authentication/SignUp';
import Header from './features/layout/Header';
import SnackbarComponent, { SnackbarContext } from './baseComponents/Snackbar';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
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
    <>
      <SnackbarComponent
        handleShowMessage={handleShowMessage}
        handleCloseMessage={handleCloseMessage}
        open={open}
        message={snackbarMessage}
        type={snackbarType}
      />
      <div className="App">
        <Router>
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
        </Router>
      </div>
    </>
  );
}

export default App;
