import React from 'react';
import PropTypes from 'prop-types';

import Stylesheet from './components/Stylesheet';

const Layout = props => (
  <Stylesheet>{React.cloneElement(props.children, props)}</Stylesheet>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
