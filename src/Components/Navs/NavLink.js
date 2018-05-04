import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterNavLink } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  keepFocus: PropTypes.bool,
};
const defaultProps = {
  onClick: null,
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
    const { children, keepFocus, ...otherProps } = this.props;

    return (
      <RouterNavLink
        {...otherProps}
        onClick={this.onClick}
        innerRef={(c) => {
          this.link = c;
        }}
        className="nav-link"
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
