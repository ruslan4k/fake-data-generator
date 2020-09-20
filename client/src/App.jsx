import React, { useState } from 'react';
import DataGeneratorPage from './features/dataGenerator/containers/DataGeneratorPage';
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
        <SnackbarContext.Provider
          value={{
            handleShowMessage,
            handleCloseMessage,
          }}
        >
          <DataGeneratorPage handleShowMessage={handleShowMessage} />
        </SnackbarContext.Provider>
      </div>
    </>
  );
}

export default App;
