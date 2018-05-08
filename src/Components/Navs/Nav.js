import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['tabs', 'pills']),
};

const defaultProps = {
  variant: 'tabs',
};

function Nav({ children, variant, ...elementProps }) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    variant === 'tabs' && 'nav-tabs',
    variant === 'pills' && 'nav-pills',
  );

  return (
    <BaseView tag="nav" props={elementProps} className={classes}>
      {children}
    </BaseView>
  );
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

Nav.Link = NavLink;

export default Nav;
