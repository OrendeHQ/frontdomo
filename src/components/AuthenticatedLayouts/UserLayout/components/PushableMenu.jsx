import React from 'react';
import { Sidebar, Menu, Icon, Segment } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyleWrapper = styled.div`
  .pusher {
    min-height: 100vh;
  }
`;

export default class PushableMenu extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    visible: PropTypes.bool.isRequired,
    goTo: PropTypes.func.isRequired,
  };

  render() {
    return (
      <StyleWrapper>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            width="thin"
            visible={this.props.visible}
            icon="labeled"
            vertical
          >
            <Menu.Item
              name="parcel"
              onClick={() => this.props.goTo('/parcels')}
            >
              <Icon name="archive" />
              Parcel Management
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            {React.cloneElement(this.props.children, this.props)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </StyleWrapper>
    );
  }
}
