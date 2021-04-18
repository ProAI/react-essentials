import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import NavbarContext from '../navbar/NavbarContext';
import TabContext from './TabContext';
import NavLink from './NavLink';
import NavContext from './NavContext';

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
    // constant classes
    !navbar && 'nav',
    navbar && 'navbar-nav',
    // variable classes
    !navbar && variant && `nav-${variant}`,
  );

  return (
    <NavContext.Provider value={{}}>
      <BaseView
        {...elementProps}
        ref={ref}
        accessibilityRole={getRole(tabbable, navbar)}
        essentials={{ className: classes }}
      />
    </NavContext.Provider>
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Context = NavContext;
Nav.Link = NavLink;

export default Nav;
