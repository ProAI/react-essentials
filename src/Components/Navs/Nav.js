import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  pills: PropTypes.bool,
  stacked: PropTypes.bool,
};

const Nav = React.forwardRef(function Nav(props, ref) {
  const { pills = false, stacked = false, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    !pills && 'nav-tabs',
    pills && 'nav-pills',
    stacked && 'flex-column',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole="navigation"
      essentials={{ className: classes }}
    />
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Link = NavLink;

export default Nav;
