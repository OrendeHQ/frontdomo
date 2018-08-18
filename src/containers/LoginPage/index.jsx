import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import logo from 'assets/logo.svg';
import { tokenLogin } from 'actions';
import { LOADING, ERROR } from 'constants/misc';
import { token as tokenPropTypes } from 'constants/propTypes';

const StyleWrapper = styled.div`
  height: 100vh;
  body > div,
  body > div > div,
  body > div > div > div.login-form {
    height: 100%;
  }
  .container-grid {
    height: 100%;
    .form-wrapper {
      max-width: 450px;
    }
  }
`;

class LoginPage extends React.Component {
  static propsType = {
    token: tokenPropTypes.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  inputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleSubmit = () => {
    this.props.tokenLogin(this.state);
  };

  render() {
    return (
      <StyleWrapper>
        <Grid
          textAlign="center"
          className="container-grid"
          verticalAlign="middle"
        >
          <Grid.Column className="form-wrapper">
            <Header as="h2" color="yellow" textAlign="center">
              <Image src={logo} /> Log-in to your account
            </Header>
            <Form
              size="large"
              onSubmit={this.handleSubmit}
              loading={this.props.token.status === LOADING}
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.inputChange('username', e.target.value)}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.inputChange('password', e.target.value)}
                />
                <Button color="yellow" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            {this.props.token.status === ERROR && (
              <Message negative>
                <strong>{this.props.token.error}!</strong> Please try again
              </Message>
            )}
          </Grid.Column>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ token }) => ({ token }),
  { tokenLogin },
)(LoginPage);
