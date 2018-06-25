import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { SUCCESS } from 'constants/misc';
import PropTypes from 'prop-types';

import { token as tokenPropsType } from 'constants/propTypes';
import { requiredIf } from 'lib/propTypes';

const PublicRoute = ({ component: Component, token, render, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token.status !== SUCCESS ? (
        render ? (
          render(props)
        ) : (
          <Component {...props} />
        )
      ) : token.isAdmin ? (
        <Redirect
          to={{ pathname: '/admin', state: { from: props.location } }}
        />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);
PublicRoute.propsType = {
  token: tokenPropsType.isRequired,
  component: requiredIf(PropTypes.element, props => !props.render),
  render: requiredIf(PropTypes.func, props => !props.component),
};

export default connect(
  ({ token }) => ({ token }),
  {},
)(PublicRoute);
