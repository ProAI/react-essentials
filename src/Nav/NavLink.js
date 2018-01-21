import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink as RouterNavLink } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  keepFocus: PropTypes.bool,
};
const defaultProps = {
  onClick: null,
  className: null,
  keepFocus: false,
};

class NavLink extends React.Component {
  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (!this.props.keepFocus) {
      this.link.blur();
    }
  };

  render() {
    const {
      children, className, keepFocus, ...attributes
    } = this.props;

    // create component classes
    const classes = cx('nav-link', className);
    return (
      <RouterNavLink
        {...attributes}
        onClick={this.onClick}
        innerRef={(c) => {
          this.link = c;
        }}
        className={classes}
        activeClassName="active"
      >
        {children}
      </RouterNavLink>
    );
  }
}

NavLink.propTypes = propTypes;
NavLink.defaultProps = defaultProps;

export default NavLink;
