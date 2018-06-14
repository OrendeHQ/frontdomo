import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SUCCESS } from 'constants/misc';
import { token as tokenPropsType } from 'constants/propTypes';
import { requiredIf } from 'lib/propTypes';

const PrivateRoute = ({
  component: Component,
  token,
  render,
  admin,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (token.status !== SUCCESS) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      const successfulRender = render ? (
        render(props)
      ) : (
        <Component {...props} />
      );

      if (admin) {
        if (token.isAdmin) {
          return successfulRender;
        } else {
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );
        }
      } else {
        if (!token.isAdmin) {
          return successfulRender;
        } else {
          return (
            <Redirect
              to={{ pathname: '/admin', state: { from: props.location } }}
            />
          );
        }
      }
    }}
  />
);
PrivateRoute.propsType = {
  token: tokenPropsType.isRequired,
  component: requiredIf(PropTypes.element, props => !props.render),
  render: requiredIf(PropTypes.func, props => !props.component),
};

export default connect(
  ({ token }) => ({ token }),
  {},
)(PrivateRoute);
