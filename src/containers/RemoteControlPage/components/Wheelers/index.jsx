import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { canGame } from 'lib/misc';
import wheel from 'assets/wheel.svg';

const StyleWrapper = styled.div`
  text-align: center;
`;

const StyledImage = styled.img`
  max-height: 50px;
  transform: rotateZ(${({ angle }) => angle}deg);
`;

export default class Wheelers extends React.Component {
  state = {
    angle: 0,
    connected: false,
  };
  static propsType = {
    wscli: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (canGame) {
      window.addEventListener('gamepadconnected', this.onGamepadConnected);
      window.addEventListener(
        'gamepaddisconnected',
        this.onGamepadDisconnected,
      );
    }
  }

  componentWillUnmount() {
    if (canGame) {
      window.removeEventListener('gamepadconnected', this.onGamepadConnected);
      window.removeEventListener(
        'gamepaddisconnected',
        this.onGamepadDisconnected,
      );
    }
  }

  onGamepadConnected = () => {
    this.setState({ connected: true });
    this.syncCommands();
  };

  onGamepadDisconnected = () => {
    this.setState({ connected: false });
    this.unsyncCommands();
  };

  syncCommands = () => {
    this.syncInterval = setInterval(() => {
      const gp = navigator.getGamepads()[0];
      if (gp && gp.axes && gp.axes.length > 0) {
        const newAngle = 90 * gp.axes[0];
        if (newAngle !== this.state.angle) {
          this.setState({ angle: newAngle });
        }

        let cmdStr = '';
        const braking =
          (gp.buttons[6].pressed && !gp.buttons[7].pressed) ||
          (gp.buttons[8].pressed && !gp.buttons[9].pressed);
        const accel =
          (!gp.buttons[6].pressed && gp.buttons[7].pressed) ||
          (!gp.buttons[8].pressed && gp.buttons[9].pressed);
        if (braking) {
          cmdStr += 'b';
        } else if (accel) {
          cmdStr += 'a';
        } else {
          cmdStr += 'o';
        }

        cmdStr += `(${Math.round(this.state.angle * 1000) / 1000})`;
        this.props.websocket.send(cmdStr);
      }
    }, 100);
  };

  unsyncCommands = () => {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }
  };

  render() {
    return (
      <StyleWrapper>
        {!canGame && <h3>This browser is not compatible with driving wheel</h3>}
        {canGame &&
          !this.state.connected && (
            <h3>
              Driving wheel not connected! You might have to press a button to
              activate the wheel
            </h3>
          )}
        {canGame &&
          this.state.connected && (
            <StyledImage angle={this.state.angle} src={wheel} />
          )}
      </StyleWrapper>
    );
  }
}
