import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarContext from './NavbarContext';
import NavbarText from './NavbarText';
import NavbarToggler from './NavbarToggler';
import useNavbar from './useNavbar';
import BaseView from '../../utils/rnw-compat/BaseView';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['light', 'dark']),
  expand: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl']),
  defaultExpanded: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
};

const Navbar = React.forwardRef((props, ref) => {
  const {
    variant = 'light',
    expand,
    defaultExpanded = false,
    expanded,
    onToggle = () => {},
    ...elementProps
  } = props;

  const navbar = useNavbar(defaultExpanded, expanded, onToggle, expand);

  const classes = cx(
    // constant classes
    'navbar',
    `navbar-${variant}`,
    // variable classes
    expand && expand === true ? 'navbar-expand' : `navbar-expand-${expand}`,
  );

  return (
    <NavbarContext.Provider value={navbar}>
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
