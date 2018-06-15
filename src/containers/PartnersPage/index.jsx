import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Header, Icon } from 'semantic-ui-react';

import DodoTable from 'components/DodoTable';

const StyleWrapper = styled(Container)``;

class PartnersPage extends React.Component {
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
            <DodoTable />
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default PartnersPage;
