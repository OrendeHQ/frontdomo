import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import store, { history } from 'store';
import { PrivateRoute, PublicRoute } from 'components/Routes';
import Layout from 'components/Layout';
import LoginPage from 'containers/LoginPage';
import AdminHomePage from 'containers/AdminHomePage';
import HomePage from 'containers/HomePage';

const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute
            admin
            path="/admin"
            render={() => (
              <Switch>
                <Route path="/" component={AdminHomePage} />
              </Switch>
            )}
          />
          <PrivateRoute
            path="/"
            render={() => (
              <Switch>
                <Route path="/" component={HomePage} />
              </Switch>
            )}
          />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('root'));
