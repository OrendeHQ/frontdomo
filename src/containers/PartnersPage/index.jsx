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
import {
  fetchAllCompanies,
  toggleCompanyEdit,
  addNewCompany,
  editExistingCompany,
  removeCompany,
} from 'actions';
import { companyRedux } from 'constants/propTypes';
import { LOADING, ERROR } from 'constants/misc';

const StyleWrapper = styled(Container)``;

class PartnersPage extends React.Component {
  static propTypes = {
    company: companyRedux,
  };
  state = {
    adding: false,
    showErr: false,
  };

  shouldComponentUpdate(nextProps) {
    if (
      this.props.company.status !== ERROR &&
      nextProps.company.status === ERROR
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
  }

  toggleAdding = () => {
    this.setState({ adding: !this.state.adding });
  };

  add = company => {
    this.props.addNewCompany(company);
    this.toggleAdding();
  };

  edit = company => {
    this.props.editExistingCompany(company);
  };

  toggleShowErr = () => {
    this.setState({ showErr: !this.state.showErr });
  };

  render() {
    const fields = [
      {
        key: 'name',
        editor: ({ innerRef, ...props }) => (
          <input
            ref={innerRef}
            {...props}
            placeholder="Enter Company Name..."
          />
        ),
        display: ({ value, ...props }) => <p {...props}>{value}</p>,
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
          {this.props.company.status === ERROR &&
            this.state.showErr && (
              <Grid.Row centered>
                <Message negative>
                  <p>
                    <strong>Error!</strong> {this.props.company.error}
                  </p>
                </Message>
              </Grid.Row>
            )}
          <Grid.Row centered>
            <DodoTable
              loading={this.props.company.status === LOADING}
              fields={fields}
              headers={{ name: 'Name' }}
              rows={this.props.company.value}
              toggleEdit={this.props.toggleCompanyEdit}
              adding={this.state.adding}
              toggleAdd={this.toggleAdding}
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
              deleteFunc={this.props.removeCompany}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ company }) => ({ company }),
  {
    fetchAllCompanies,
    toggleCompanyEdit,
    addNewCompany,
    editExistingCompany,
    removeCompany,
  },
)(PartnersPage);
