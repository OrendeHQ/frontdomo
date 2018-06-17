import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Grid,
  Header,
  Icon,
  Message,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

import DodoTable from 'components/DodoTable';
import { fetchAllCompanies, fetchAllUsers, toggleUserEdit } from 'actions';
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

  add = (/*user*/) => {};

  edit = (/*user*/) => {};

  toggleShowErr = () => {
    this.setState({ showErr: !this.state.showErr });
  };

  render() {
    const fields = [
      {
        key: 'username',
        editor: ({ innerRef, ...props }) => (
          <input ref={innerRef} {...props} disabled />
        ),
        display: ({ value }) => <p>{value}</p>,
      },
      {
        key: 'email',
        editor: ({ innerRef, ...props }) => (
          <input ref={innerRef} {...props} placeholder="Enter Email..." />
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
              <Icon name="building" circular />
              <Header.Content>Partners</Header.Content>
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
              loading={this.props.company.status === LOADING}
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
              defaultAddValue={{ name: '', editing: true }}
              addFunc={this.add}
              addButton={() => (
                <Button
                  floated="right"
                  icon
                  labelPosition="left"
                  positive
                  size="small"
                  onClick={this.toggleAdding}
                >
                  <Icon name="building" /> Add Partner
                </Button>
              )}
              editFunc={this.edit}
              deleteFunc={() => {}}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ company, user }) => ({ company, user }),
  { fetchAllCompanies, fetchAllUsers, toggleUserEdit },
)(UsersPage);
