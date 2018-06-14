import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import store, { history } from 'store';
import { PrivateRoute, PublicRoute } from 'components/Routes';
import Layout from 'components/Layout';
import { AdminLayout, UserLayout } from 'components/AuthenticatedLayouts';
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
              <AdminLayout>
                <Switch>
                  <Route path="/" component={AdminHomePage} />
                </Switch>
              </AdminLayout>
            )}
          />
          <PrivateRoute
            path="/"
            render={() => (
              <UserLayout>
                <Switch>
                  <Route path="/" component={HomePage} />
                </Switch>
              </UserLayout>
            )}
          />
        </Switch>
      </Layout>
    </ConnectedRouter>
  </Provider>
);

render(router, document.getElementById('root'));
