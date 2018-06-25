import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Navbar from './components/Navbar';
import PushableMenu from './components/PushableMenu';
import { history } from 'store';

const StyleWrapper = styled.div`
  .app-content {
    margin: 70px 20px 50px 20px;
  }
`;

export default class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  state = {
    sidebarVisible: false,
  };

  toggleSidebar = () => {
    this.setState({ sidebarVisible: !this.state.sidebarVisible });
  };

  goTo = link => {
    history.push(link);
    this.setState({ sidebarVisible: false });
  };

  render() {
    return (
      <StyleWrapper>
        <PushableMenu visible={this.state.sidebarVisible} goTo={this.goTo}>
          <>
            <Navbar onToggle={this.toggleSidebar} />
            <div className="app-content">
              {React.cloneElement(this.props.children, this.props)}
            </div>
          </>
        </PushableMenu>
      </StyleWrapper>
    );
  }
}
