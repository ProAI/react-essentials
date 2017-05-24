import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

function Nav({ children }) {
  return (
    <ul className="nav">
      {children}
    </ul>
  );
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
