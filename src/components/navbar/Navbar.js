import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarContext from './NavbarContext';
import NavbarText from './NavbarText';
import NavbarToggler from './NavbarToggler';
import BaseView from '../../utils/rnw-compat/BaseView';
import useIdentifier from '../../hooks/useIdentifier';

const propTypes = {
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
  expand: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl']),
  fixed: PropTypes.oneOf(['top', 'bottom']),
  sticky: PropTypes.oneOf(['top']),
  onToggle: PropTypes.func,
};

const Navbar = React.forwardRef((props, ref) => {
  const {
    expanded: controlledExpanded = false,
    variant = 'light',
    expand,
    fixed,
    sticky,
    onToggle = () => {},
    ...elementProps
  } = props;

  const identifier = useIdentifier('navbar');
  const [expanded, setExpanded] = useState(controlledExpanded);

  const context = useMemo(
    () => ({
      identifier,
      toggle: () => {
        setExpanded((value) => {
          onToggle(!value);

          return !value;
        });
      },
      expanded,
      expand,
    }),
    [expanded],
  );

  const classes = cx(
    // constant classes
    'navbar',
    `navbar-${variant}`,
    // variable classes
    expand && expand === true ? 'navbar-expand' : `navbar-expand-${expand}`,
    fixed && `fixed-${fixed}`,
    sticky && `sticky-${sticky}`,
  );

  return (
    <NavbarContext.Provider value={context}>
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

Navbar.Brand = NavbarBrand;
Navbar.Collapse = NavbarCollapse;
Navbar.Text = NavbarText;
Navbar.Toggler = NavbarToggler;

export default Navbar;
