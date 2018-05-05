import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import NavLink from './NavLink';

const propTypes = {
  variant: PropTypes.oneOf(['basic', 'tabs', 'pills']),
};

const defaultProps = {
  variant: 'basic',
};

function Nav({ variant, ...elementProps }) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    variant === 'tabs' && 'nav-tabs',
    variant === 'pills' && 'nav-pills',
  );

  return <BaseView elementProps={elementProps} tag="nav" className={classes} />;
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

Nav.Link = NavLink;

export default Nav;
