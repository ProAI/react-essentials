import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import NavbarContext from '../navbar/NavbarContext';
import TabContext from './TabContext';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['tabs', 'pills']),
};

const getRole = (context, navbarContext) => {
  if (navbarContext !== undefined) {
    return null;
  }

  if (context !== undefined) {
    return 'tablist';
  }

  return 'navigation';
};

const Nav = React.forwardRef((props, ref) => {
  const { variant = null, ...elementProps } = props;

  const context = useContext(TabContext);
  const navbarContext = useContext(NavbarContext);

  const classes = cx(
    // variable classes
    navbarContext === undefined && 'nav',
    navbarContext === undefined && variant && `nav-${variant}`,
    navbarContext !== undefined && 'navbar-nav',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole={getRole(context, navbarContext)}
      essentials={{ tag: 'nav', className: classes }}
    />
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Link = NavLink;

export default Nav;
