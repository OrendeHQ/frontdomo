import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import DodoTable from 'components/DodoTable';
import { fetchAllCompanies, toggleCompanyEdit, addNewCompany } from 'actions';
import { companyRedux } from 'constants/propTypes';
import { LOADING } from 'constants/misc';

const StyleWrapper = styled(Container)``;

class PartnersPage extends React.Component {
  static propTypes = {
    company: companyRedux,
  };
  state = {
    adding: false,
  };

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
          <Grid.Row centered>
            <DodoTable
              loading={this.props.company.status === LOADING}
              fields={fields}
              headers={{ name: 'Name' }}
              rows={this.props.company.value}
              toggleEdit={this.props.toggleCompanyEdit}
              adding={this.state.adding}
              defaultAddValue={{ name: '', editing: true }}
              toggleAdd={this.toggleAdding}
              addFunc={this.add}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ company }) => ({ company }),
  { fetchAllCompanies, toggleCompanyEdit, addNewCompany },
)(PartnersPage);
