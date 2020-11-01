/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ReactGA from 'react-ga';
import Routes from './features/Routes';
import configureStore from './state/configureStore';
import history from './helpers/history';

history.listen((location) => {
  ReactGA.pageview(location.pathname + location.search);
});

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-181214830-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  const initialState = {};
  const store = configureStore(initialState, history);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="text-center p-8 xs:p-32 text-24 min-h-full bg-gray-100">
          <Routes />
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
