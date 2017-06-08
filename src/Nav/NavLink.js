import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

function NavLink({ children }) {
  return (
    <li className="nav-item">
      {children}
    </li>
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
