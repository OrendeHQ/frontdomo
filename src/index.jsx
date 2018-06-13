import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';

import store, { history } from 'store';

import Layout from 'components/Layout';
import LoginPage from 'containers/LoginPage';

const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('root'));
