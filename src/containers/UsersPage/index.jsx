import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Header,
  Icon,
  Message,
  Button,
  Modal,
  Form,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import DodoTable from 'components/DodoTable';
import {
  fetchAllCompanies,
  fetchAllUsers,
  toggleUserEdit,
  addNewUser,
  editExistingUser,
  removeUser,
} from 'actions';
import { userRedux, companyRedux } from 'constants/propTypes';
import { ERROR, LOADING } from 'constants/misc';

const StyleWrapper = styled(Container)``;

class UsersPage extends React.Component {
  static propTypes = {
    user: userRedux,
    company: companyRedux,
  };
  state = {
    adding: false,
    showErr: false,
    user: null,
    passwordModal: false,
    passwordErr: '',
  };

  shouldComponentUpdate(nextProps) {
    if (
      (this.props.user.status !== ERROR && nextProps.user.status === ERROR) ||
      (this.props.company.status !== ERROR &&
        nextProps.company.status === ERROR)
    ) {
      if (this.timeoutShowErr) {
        clearTimeout(this.timeoutShowErr);
      }
      if (!this.state.showErr) {
        this.toggleShowErr();
      }
      this.timeoutShowErr = setTimeout(this.toggleShowErr, 10000);

      return this.state.showErr;
    }

    return true;
  }

  componentDidMount() {
    this.props.fetchAllCompanies();
    this.props.fetchAllUsers();
  }

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding });
  };

  add = user => {
    this.setState({ user, passwordModal: true });
  };

  postUser = () => {
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    if (!password || !confirmPassword) {
      return this.setState({
        passwordErr: 'Please enter both password and password confirmation',
      });
    } else if (password.length < 8) {
      return this.setState({
        passwordErr: 'Password must be at least 8 characters',
      });
    } else if (password !== confirmPassword) {
      return this.setState({
        passwordErr: "Password and password confirmation doesn't match",
      });
    }

    const postedUser = Object.assign({}, this.state.user, {
      password: password,
      company_id:
        this.state.user.is_admin === 'true' ? null : this.state.user.company_id,
    });
    this.props.addNewUser(postedUser);
    this.setState({ passwordModal: false, adding: false, passwordErr: '' });
  };

  toggleModal = () => {
    this.setState({ passwordModal: !this.state.passwordModal });
  };

  edit = user => {
    this.props.editExistingUser(user);
  };

  toggleShowErr = () => {
    this.setState({ showErr: !this.state.showErr });
  };

  render() {
    const fields = [
      {
        key: 'username',
        editor: ({ innerRef, ...props }) => (
          <input
            ref={innerRef}
            {...props}
            placeholder="Enter username"
            disabled={!!props.defaultValue}
          />
        ),
        display: ({ value }) => <p>{value}</p>,
      },
      {
        key: 'email',
        editor: ({ innerRef, ...props }) => (
          <input
            ref={innerRef}
            {...props}
            placeholder="Enter Email..."
            disabled={!!props.defaultValue}
          />
        ),
        display: ({ value }) => <p>{value}</p>,
      },
      {
        key: 'is_admin',
        editor: ({ innerRef, ...props }) => (
          <select className="ui fluid dropdown" ref={innerRef} {...props}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        ),
        display: ({ value }) => <p>{value ? 'Yes' : 'No'}</p>,
      },
      {
        key: 'company_id',
        editor: ({ innerRef, ...props }) => (
          <select className="ui fluid dropdown" ref={innerRef} {...props}>
            {this.props.company.value.map(({ _id, name }) => (
              <option value={_id} key={_id}>
                {name}
              </option>
            ))}
          </select>
        ),
        display: ({ value }) => (
          <p>
            {value &&
              this.props.company.value.find(({ _id }) => _id === value).name}
          </p>
        ),
      },
    ];

    return (
      <StyleWrapper fluid>
        <Grid columns="equal">
          <Grid.Row centered>
            <Header as="h2" icon textAlign="center">
              <Icon name="user" circular />
              <Header.Content>Users</Header.Content>
            </Header>
          </Grid.Row>
          {this.props.company.status === ERROR ||
            (this.props.user.status === ERROR &&
              this.state.showErr && (
                <Grid.Row centered>
                  <Message negative>
                    <p>
                      <strong>Error!</strong>{' '}
                      {this.props.user.status === ERROR
                        ? this.props.user.error
                        : this.props.company.error}
                    </p>
                  </Message>
                </Grid.Row>
              ))}
          <Grid.Row centered>
            <DodoTable
              loading={
                this.props.company.status === LOADING ||
                this.props.user.status === LOADING
              }
              fields={fields}
              headers={{
                username: 'Username',
                email: 'Email',
                is_admin: 'Is Admin?',
                company_id: 'Company',
              }}
              rows={this.props.user.value}
              toggleEdit={this.props.toggleUserEdit}
              adding={this.state.adding}
              defaultAddValue={{
                username: '',
                email: '',
                is_admin: false,
                company_id: '',
                editing: true,
              }}
              addFunc={this.add}
              toggleAdd={this.toggleAdding}
              addButton={() => (
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  positive
                  size="small"
                  onClick={this.toggleAdding}
                >
                  <Icon name="user" /> Add User
                </Button>
              )}
              editFunc={this.edit}
              deleteFunc={this.props.removeUser}
            />
          </Grid.Row>
        </Grid>
        <Modal open={this.state.passwordModal} size="small">
          <Modal.Header>Enter Password</Modal.Header>
          <Modal.Content>
            {this.state.passwordErr && (
              <Message negative>
                <strong>Error!</strong> {this.state.passwordErr}
              </Message>
            )}
            <Form onSubmit={this.postUser}>
              <Form.Field>
                <label>Password</label>
                <input
                  placeholder="Enter Password"
                  ref={i => (this.passwordInput = i)}
                  type="password"
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  ref={i => (this.confirmPasswordInput = i)}
                  type="password"
                  required
                />
              </Form.Field>
              <div style={{ height: '30px' }}>
                <Button floated="right" type="submit" icon color="green">
                  <Icon name="checkmark" /> Submit
                </Button>
                <Button
                  floated="right"
                  type="button"
                  icon
                  onClick={this.toggleModal}
                >
                  <Icon name="remove" /> Cancel
                </Button>
              </div>
            </Form>
          </Modal.Content>
        </Modal>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ company, user }) => ({ company, user }),
  {
    fetchAllCompanies,
    fetchAllUsers,
    toggleUserEdit,
    addNewUser,
    editExistingUser,
    removeUser,
  },
)(UsersPage);
