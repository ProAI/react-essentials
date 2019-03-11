import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseView } from '../../utils/components';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  pills: PropTypes.bool,
  stacked: PropTypes.bool,
};

const defaultProps = {
  pills: false,
  stacked: false,
};

function Nav({ children, pills, stacked, ...elementProps }) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    !pills && 'nav-tabs',
    pills && 'nav-pills',
    stacked && 'flex-column',
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
