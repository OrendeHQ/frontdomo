import React from 'react';
import {
  Container,
  Grid,
  Header,
  Icon,
  Message,
  Button,
  Form,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { token as tokenType } from 'constants/propTypes';
import { AdminLayout, UserLayout } from 'components/AuthenticatedLayouts';
import { changePassword } from 'lib/userService';

const StyleWrapper = styled(Container)``;

class ChangePasswordPage extends React.Component {
  static propTypes = {
    token: tokenType,
  };
  state = {
    showErr: false,
    err: '',
    showSuccess: false,
    loading: false,
  };

  showSuccessBanner = () => {
    this.setState({ showSuccess: true });
    if (this.succesTimeout) {
      clearTimeout(this.succesTimeout);
    }
    this.succesTimeout = setTimeout(
      () => this.setState({ showSuccess: false }),
      5000,
    );
  };

  showErrBanner = message => {
    this.setState({ showErr: true, err: message });
    if (this.errTimeout) {
      clearTimeout(this.errTimeout);
    }
    this.errTimeout = setTimeout(
      () => this.setState({ showErr: false, err: '' }),
      5000,
    );
  };

  clearBanner = () => {
    this.setState({ showErr: false, showSuccess: false, err: '' });
    if (this.errTimeout) {
      clearTimeout(this.errTimeout);
    }
    if (this.succesTimeout) {
      clearTimeout(this.succesTimeout);
    }
  };

  componentWillUnmount() {
    this.clearBanner();
  }

  handleSubmit = () => {
    const oldPassword = this.oldInput.value;
    const password = this.newInput.value;
    const cfmPassword = this.confirmInput.value;

    this.clearBanner();

    if (password !== cfmPassword) {
      return this.setState({
        showErr: true,
        err: "Password confirmation doesn't match",
      });
    }

    this.setState({ loading: true });
    changePassword({ oldPassword, password }, this.props.token.value)
      .then(() => {
        this.setState({ loading: false });
        this.showSuccessBanner();
      })
      .catch(e => {
        this.setState({ loading: false });
        this.showErrBanner(e.message);
      });
  };

  render() {
    const Layout = this.props.token.isAdmin ? AdminLayout : UserLayout;

    return (
      <Layout>
        <StyleWrapper fluid>
          <Grid columns="equal">
            <Grid.Row centered>
              <Header as="h2" icon textAlign="center">
                <Icon name="key" circular />
                <Header.Content>Change Password</Header.Content>
              </Header>
            </Grid.Row>
            {this.state.showErr && (
              <Grid.Row centered>
                <Message negative>
                  <p>
                    <strong>Error!</strong> {this.state.err}
                  </p>
                </Message>
              </Grid.Row>
            )}
            {this.state.showSuccess && (
              <Grid.Row centered>
                <Message success>
                  <p>
                    <strong>Success!</strong> Password has been changed
                  </p>
                </Message>
              </Grid.Row>
            )}
            <Grid.Row centered>
              <Dimmer active={this.state.loading} inverted>
                <Loader />
              </Dimmer>
              <Dimmer.Dimmable style={{ width: '70%' }}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Old Password</label>
                    <input
                      ref={i => (this.oldInput = i)}
                      placeholder="Enter old password"
                      type="password"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>New Password</label>
                    <input
                      ref={i => (this.newInput = i)}
                      placeholder="Enter new password"
                      type="password"
                      required
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Confirm New Password</label>
                    <input
                      ref={i => (this.confirmInput = i)}
                      placeholder="Confirm new password"
                      type="password"
                      required
                    />
                  </Form.Field>
                  <Button type="submit" positive>
                    <Icon name="checkmark" />
                    Save Password
                  </Button>
                </Form>
              </Dimmer.Dimmable>
            </Grid.Row>
          </Grid>
        </StyleWrapper>
      </Layout>
    );
  }
}

export default connect(
  ({ token }) => ({ token }),
  {},
)(ChangePasswordPage);
