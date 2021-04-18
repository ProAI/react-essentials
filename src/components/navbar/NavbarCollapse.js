import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import invariant from 'fbjs/lib/invariant';
import BaseView from '../../utils/rnw-compat/BaseView';
import NavbarContext from './NavbarContext';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const NavbarCollapse = React.forwardRef((props, ref) => {
  const navbar = useContext(NavbarContext);

  invariant(
    navbar,
    'NavbarCollapse can only be used inside a Navbar component.',
  );

  const classes = cx(
    // constant classes
    'collapse',
    'navbar-collapse',
    // variable classes
    navbar.expanded && 'show',
  );

  return (
    <BaseView
      {...props}
      ref={ref}
      aria-labelledby={navbar.identifier}
      essentials={{ className: classes }}
    />
  );
});

NavbarCollapse.displayName = 'NavbarCollapse';
NavbarCollapse.propTypes = propTypes;

export default NavbarCollapse;
