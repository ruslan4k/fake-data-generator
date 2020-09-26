import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './features/Routes';
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
          <Routes />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
