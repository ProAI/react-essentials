import React from 'react';
import PropTypes from 'prop-types';
import NavLink from './NavLink';

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

class Nav extends React.Component {
  static Link = NavLink;

  render() {
    const { children } = this.props;
    return (
      <ul className="nav">
        {children}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

export default Nav;
