import React from 'react';
import { Container, Grid, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { WS_URL } from 'constants/misc';
import JSMpeg from 'lib/JSMpeg';
import DodoMap from 'components/DodoMap';
import Wheelers from './components/Wheelers';
import { getParcelInsideRobot } from 'lib/parcelService';
import ParcelsList from './components/ParcelsList';
import { getRobotLocation } from 'lib/robotService';

const StyleWrapper = styled(Container)`
  canvas {
    width: 100%;
  }
`;
const FloatingMessage = styled(Message)`
  &.ui.message {
    position: fixed;
    top: 500px;
    right: 20px;
    z-index: 3;
  }
`;

class RemoteControlPage extends React.Component {
  state = {
    parcels: [],
    loading: false,
    error: '',
    position: { lat: 1.3521, lng: 103.8198 },
  };

  componentDidMount() {
    const url = `${WS_URL}/user?token=${this.props.token.value}&robot_id=${
      this.props.match.params.id
    }`;
    /*const player = */ new JSMpeg.Player(url, { canvas: this.canvas });
    // const wscli = player.source.socket;

    const robotID = this.props.match.params.id;
    this.setState({ loading: true });
    getParcelInsideRobot({ robotID }, this.props.token.value)
      .then(({ parcels }) => this.setState({ parcels, loading: false }))
      .catch(({ message }) =>
        this.setState({ loading: false, error: message }),
      );

    this.syncCurrentLocation();
  }

  componentWillUnmount() {
    if (this.locSync) {
      clearInterval(this.locSync);
    }
  }

  syncCurrentLocation = () => {
    if (this.locSync) {
      clearInterval(this.locSync);
    }
    this.locSync = setInterval(this.getCurrentLocation, 3000);
  };

  getCurrentLocation = () => {
    const robotID = this.props.match.params.id;
    getRobotLocation({ robotID }, this.props.token.value)
      .then(({ location }) =>
        this.setState({ position: { lat: location.x, lng: location.y } }),
      )
      .catch(({ message }) => this.showErr(message));
  };

  showErr = message => {
    if (this.errTimeout) {
      clearTimeout(this.errTimeout);
    }

    this.setState({ error: message });
    this.errTimeout = setTimeout(() => this.setState({ error: '' }), 5000);
  };

  render() {
    return (
      <StyleWrapper fluid>
        {this.state.error && (
          <FloatingMessage negative>
            <strong>Error!</strong> {this.state.error}
          </FloatingMessage>
        )}
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <canvas ref={c => (this.canvas = c)} />
            </Grid.Column>
            <Grid.Column>
              <DodoMap markerPosition={this.state.position} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <ParcelsList
                parcels={this.state.parcels}
                token={this.props.token.value}
                loading={this.state.loading}
              />
            </Grid.Column>
            <Grid.Column centered>
              <Wheelers />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </StyleWrapper>
    );
  }
}

export default connect(
  ({ token }) => ({ token }),
  {},
)(RemoteControlPage);
