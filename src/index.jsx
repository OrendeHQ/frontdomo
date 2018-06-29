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
import PartnersPage from 'containers/PartnersPage';
import UsersPage from 'containers/UsersPage';
import RobotsPage from 'containers/RobotsPage';
import ChangePasswordPage from 'containers/ChangePasswordPage';
import ParcelsPage from 'containers/ParcelsPage';
import RemoteAccessPage from 'containers/RemoteAccessPage';

const router = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <PublicRoute exact path="/login" component={LoginPage} />
          <PrivateRoute
            both
            exact
            path="/change_password"
            component={ChangePasswordPage}
          />
          <PrivateRoute
            admin
            path="/admin"
            render={() => (
              <AdminLayout>
                <Switch>
                  <Route
                    exact
                    path="/admin/partners"
                    component={PartnersPage}
                  />
                  <Route exact path="/admin/users" component={UsersPage} />
                  <Route exact path="/admin/robots" component={RobotsPage} />
                  <Route
                    exact
                    path="/admin/remote"
                    component={RemoteAccessPage}
                  />
                  <Route exact path="/admin" component={AdminHomePage} />
                </Switch>
              </AdminLayout>
            )}
          />
          <PrivateRoute
            path="/"
            render={() => (
              <UserLayout>
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/parcels" component={ParcelsPage} />
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
