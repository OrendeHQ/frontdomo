import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

import { defaultState } from 'constants/misc';
import rootReducer from 'reducers';

export const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const enhancers = compose(
  window.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        applyMiddleware(historyMiddleware, thunk),
      )
    : applyMiddleware(historyMiddleware, thunk),
);

const store = createStore(rootReducer, defaultState, enhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('reducers').default; // eslint-disable-line global-require
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
