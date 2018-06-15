import React from 'react';
import styled from 'styled-components';
import { Container, Grid, Image, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';

const StyleWrapper = styled(Container)``;

export default class AdminHomePage extends React.Component {
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
            <Button basic color="orange" as={Link} to="/admin/partners">
              <Icon name="building" />
              Partners Management
            </Button>
            <Button basic color="yellow" as={Link} to="/admin/users">
              <Icon name="user" />
              Users Management
            </Button>
            <Button basic color="brown" as={Link} to="/admin/robots">
              <Icon name="truck" />
              Robots Management
            </Button>
            <Button basic color="grey" as={Link} to="/admin/remote_control">
              <Icon name="laptop" />
              Robot Remote Control
            </Button>
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}
