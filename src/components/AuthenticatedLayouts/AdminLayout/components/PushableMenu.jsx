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
              name="company"
              onClick={() => this.props.goTo('/admin/partners')}
            >
              <Icon name="building" />
              Partners Management
            </Menu.Item>
            <Menu.Item
              name="user"
              onClick={() => this.props.goTo('/admin/users')}
            >
              <Icon name="user" />
              Users Management
            </Menu.Item>
            <Menu.Item
              name="robot"
              onClick={() => this.props.goTo('/admin/robots')}
            >
              <Icon name="truck" />
              Robots Management
            </Menu.Item>
            <Menu.Item
              name="remote control"
              onClick={() => this.props.goTo('/admin/remote')}
            >
              <Icon name="laptop" />
              Robot Remote Control
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
