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

const getRole = (tabbable, navbar) => {
  if (navbar) {
    return null;
  }

  if (tabbable) {
    return 'tablist';
  }

  return 'navigation';
};

const Nav = React.forwardRef((props, ref) => {
  const { variant = null, ...elementProps } = props;

  const tabbable = useContext(TabContext);
  const navbar = useContext(NavbarContext);

  const classes = cx(
    // variable classes
    !navbar && 'nav',
    !navbar && variant && `nav-${variant}`,
    navbar && 'navbar-nav',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole={getRole(tabbable, navbar)}
      essentials={{ tag: 'nav', className: classes }}
    />
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Link = NavLink;

export default Nav;
