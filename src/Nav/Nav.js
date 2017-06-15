import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['basic', 'tabs', 'pills']),
};

const defaultProps = {
  className: null,
  variant: 'tabs',
};

class Nav extends React.Component {
  static Link = NavLink;

  render() {
    const { children, className, variant } = this.props;

    // create component classes
    const classes = cx(
      'nav',
      { 'nav-tabs': variant === 'tabs' },
      { 'nav-pills': variant === 'pills' },
      className,
    );

    return (
      <nav className={classes}>
        {children}
      </nav>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
