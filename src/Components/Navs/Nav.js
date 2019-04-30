import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseView from '../../utils/rnw-compat/BaseView';
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

function Nav({ pills, stacked, ...elementProps }) {
  const classes = cx(
    // constant classes
    'nav',
    // variable classes
    !pills && 'nav-tabs',
    pills && 'nav-pills',
    stacked && 'flex-column',
  );

  return (
    <BaseView
      {...elementProps}
      essentials={{ tag: 'nav', className: classes }}
    />
  );
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

Nav.Link = NavLink;

export default Nav;
