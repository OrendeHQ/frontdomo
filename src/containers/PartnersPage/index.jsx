import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import DodoTable from 'components/DodoTable';
import { fetchAllCompanies } from 'actions';
import { companyRedux } from 'constants/propTypes';
import { LOADING } from 'constants/misc';

const StyleWrapper = styled(Container)``;

class PartnersPage extends React.Component {
  static propTypes = {
    company: companyRedux,
  };

  componentDidMount() {
    this.props.fetchAllCompanies();
  }

  render() {
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
              fields={['name']}
              headers={{ name: 'Name' }}
              rows={this.props.company.value}
            />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ company }) => ({ company }),
  { fetchAllCompanies },
)(PartnersPage);
