import React from 'react';
import styled from 'styled-components';
import {
  Container,
  Header,
  Icon,
  Grid,
  List,
  Dimmer,
  Loader,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { token as tokenType } from 'constants/propTypes';
import { getOnlineRobots } from 'lib/robotService';

const StyleWrapper = styled(Container)`
  .ui.list > .item {
    padding: 0.5em 0;
  }
`;

class RemoteAccessPage extends React.Component {
  static propTypes = {
    token: tokenType.isRequired,
  };

  state = {
    loading: false,
    robots: [],
    error: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    getOnlineRobots(this.props.token.value)
      .then(({ robots }) => this.setState({ loading: false, robots }))
      .catch(({ message }) => {
        this.setState({ loading: false, error: message });
        this.errTimeout = setTimeout({ error: '' }, 5000);
      });
  }

  componentWillUnmount() {
    if (this.errTimeout) {
      clearTimeout(this.errTimeout);
    }
  }

  render() {
    return (
      <StyleWrapper fluid>
        <Grid columns="equal">
          <Grid.Row centered>
            <Header as="h2" icon textAlign="center">
              <Icon name="truck" circular />
              <Header.Content>Online Robots</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row centered>
            <h4>Please choose one to proceed to remote controlling</h4>
          </Grid.Row>
          <Grid.Row centered>
            {this.state.error && (
              <Message negative>
                <strong>Error!</strong> {this.state.error}
              </Message>
            )}
            <Dimmer.Dimmable>
              <Dimmer active={this.state.loading} inverted>
                <Loader />
              </Dimmer>
              <List animated divided verticalAlign="middle">
                {this.state.robots.map(robotID => (
                  <List.Item
                    as={Link}
                    to={`/admin/control/${robotID}`}
                    key={robotID}
                  >
                    <List.Icon name="truck" color="orange" size="big" />
                    <List.Content>
                      <List.Header as="h3">{robotID}</List.Header>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Dimmer.Dimmable>
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ token }) => ({ token }),
  {},
)(RemoteAccessPage);
