import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarContext from './NavbarContext';
import NavbarText from './NavbarText';
import NavbarToggler from './NavbarToggler';
import useNavbarState from './useNavbarState';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  expand: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl']),
  fixed: PropTypes.oneOf(['top', 'bottom']),
  sticky: PropTypes.oneOf(['top']),
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

const Navbar = React.forwardRef((props, ref) => {
  const {
    variant = 'light',
    expand,
    fixed,
    sticky,
    defaultExpanded = false,
    expanded,
    onToggle = () => {},
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'navbar',
    `navbar-${variant}`,
    // variable classes
    expand && expand === true ? 'navbar-expand' : `navbar-expand-${expand}`,
    fixed && `fixed-${fixed}`,
    sticky && `sticky-${sticky}`,
  );

  const state = useNavbarState(defaultExpanded, expanded, onToggle, expand);

  return (
    <NavbarContext.Provider value={state}>
      <BaseView
        {...elementProps}
        ref={ref}
        accessibilityRole="navigation"
        essentials={{ className: classes }}
      />
    </NavbarContext.Provider>
  );
});

Navbar.displayName = 'Navbar';
Navbar.propTypes = propTypes;

Navbar.Context = NavbarContext;
Navbar.Brand = NavbarBrand;
Navbar.Collapse = NavbarCollapse;
Navbar.Text = NavbarText;
Navbar.Toggler = NavbarToggler;

export default Navbar;
