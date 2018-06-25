import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';

const StyleWrapper = styled(Container)``;

export default class HomePage extends React.Component {
  render() {
    return (
      <StyleWrapper>
        <Grid columns="equal">
          <Grid.Row centered>
            <Image src={logo} />
          </Grid.Row>
          <Grid.Row centered>
            <h2>Welcome to do-do Cloud</h2>
          </Grid.Row>
          <Grid.Row centered>
            <h4>Please choose to proceed with one of the services</h4>
          </Grid.Row>
          <Grid.Row centered>
            <Button basic color="orange" as={Link} to="/parcels">
              <Icon name="archive" />
              Parcels Management
            </Button>
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}
