import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

function NavItem({ children }) {
  return (
    <li className="nav-item">
      {children}
    </li>
  );
}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;

export default NavItem;
