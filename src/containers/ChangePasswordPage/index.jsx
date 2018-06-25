import React from 'react';
import { connect } from 'react-redux';

import { token as tokenType } from 'constants/propTypes';
import { AdminLayout, UserLayout } from 'components/AuthenticatedLayouts';

class ChangePasswordPage extends React.Component {
  static propTypes = {
    token: tokenType,
  };

  render() {
    const Layout = this.props.token.isAdmin ? AdminLayout : UserLayout;

    return (
      <Layout>
        <div>change password page</div>
      </Layout>
    );
  }
}

export default connect(
  ({ token }) => ({ token }),
  {},
)(ChangePasswordPage);
