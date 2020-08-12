import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
import { TabContext } from './TabContainer';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['tabs', 'pills']),
};

const Nav = React.forwardRef(function Nav(props, ref) {
  const { variant = null, ...elementProps } = props;

  const context = useContext(TabContext);

  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    variant === 'tabs' && 'nav-tabs',
    variant === 'pills' && 'nav-pills',
  );

  return (
    <BaseView
      {...elementProps}
      ref={ref}
      accessibilityRole={context === undefined ? 'navigation' : 'tablist'}
      essentials={{ tag: 'nav', className: classes }}
    />
  );
});

Nav.displayName = 'Nav';
Nav.propTypes = propTypes;

Nav.Link = NavLink;

export default Nav;
