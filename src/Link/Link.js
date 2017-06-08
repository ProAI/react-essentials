import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  preventFocus: PropTypes.bool,
};

const defaultProps = {
  onClick: null,
  external: false,
  preventFocus: false,
};

class Link extends React.Component {
  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.preventFocus) {
      this.link.blur();
    }
  };

  render() {
    const { to, external, children, preventFocus, ...attributes } = this.props;

    // external link
    if (external) {
      return (
        <a {...attributes} href={to} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }

    return (
      <RouterLink
        {...attributes}
        to={to}
        onClick={this.onClick}
        ref={(c) => {
          this.link = c;
        }}
      >
        {children}
      </RouterLink>
    );
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
