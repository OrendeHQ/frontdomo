import React from 'react';
import { Icon, Image, Menu, Dropdown } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from 'assets/logo.svg';
import { tokenClear } from 'actions';

const StyleWrapper = styled.div``;

class Navbar extends React.Component {
  static propTypes = {
    onToggle: PropTypes.func.isRequired,
    tokenClear: PropTypes.func.isRequired,
  };

  render() {
    return (
      <StyleWrapper>
        <Menu fixed="top">
          <Link to="/admin">
            <Menu.Item>
              <Image size="mini" src={logo} />
            </Menu.Item>
          </Link>
          <Menu.Item onClick={this.props.onToggle}>
            <Icon name="sidebar" />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown
              item
              trigger={
                <span>
                  <Icon name="setting" /> Settings
                </span>
              }
            >
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/change_password">
                  <Icon name="key" /> Change Password
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item onClick={this.props.tokenClear}>
              <Icon name="log out" />
              Logout
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </StyleWrapper>
    );
  }
}

export default connect(
  null,
  { tokenClear },
)(Navbar);
