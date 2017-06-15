import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink as RouterNavLink } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
const defaultProps = {
  className: null,
};

function NavLink({ children, className, ...attributes }) {
  // create component classes
  const classes = cx('nav-link', className);
  return (
    <RouterNavLink className={classes} activeClassName="active" {...attributes}>
      {children}
    </RouterNavLink>
  );
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
