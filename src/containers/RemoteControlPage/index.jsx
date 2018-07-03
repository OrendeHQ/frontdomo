import React from 'react';
import { Container, Grid, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// import { WS_URL } from 'constants/misc';
// import JSMpeg from 'lib/JSMpeg';
import DodoMap from 'components/DodoMap';
import { getParcelInsideRobot } from 'lib/parcelService';
import ParcelsList from './components/ParcelsList';

const StyleWrapper = styled(Container)`
  canvas {
    width: 100%;
  }
`;

class RemoteControlPage extends React.Component {
  state = {
    parcels: [],
    loading: false,
    error: '',
  };

  componentDidMount() {
    // const url = `${WS_URL}/user?token=${this.props.token.value}&robot_id=${
    //   this.props.match.params.id
    // }`;
    // const player = new JSMpeg.Player(url, { canvas: this.canvas });
    // const wscli = player.source.socket;
    // console.log(wscli);

    const robotID = this.props.match.params.id;
    this.setState({ loading: true });
    getParcelInsideRobot({ robotID }, this.props.token.value)
      .then(({ parcels }) => this.setState({ parcels, loading: false }))
      .catch(({ message }) =>
        this.setState({ loading: false, error: message }),
      );
  }

  render() {
    return (
      <StyleWrapper fluid>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <canvas ref={c => (this.canvas = c)} />
            </Grid.Column>
            <Grid.Column>
              <DodoMap />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              {this.state.error && (
                <Message negative>
                  <strong>Error!</strong> {this.state.error}
                </Message>
              )}
              <ParcelsList
                parcels={this.state.parcels}
                token={this.props.token.value}
                loading={this.state.loading}
              />
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
