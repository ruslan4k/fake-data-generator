import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './features/Routes';
import configureStore from './state/configureStore';
import history from './helpers/history';

function App() {
  const initialState = {};
  const store = configureStore(initialState, history);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="text-center p-32 text-24 h-full bg-gray-100">
          <Routes />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
