import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  onClick: null,
  external: false,
  preventToggle: false,
  keepFocus: false,
};

class Link extends React.Component {
  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.context.onToggle !== undefined && !this.props.preventToggle) {
      this.context.onToggle();
    }

    if (!this.props.keepFocus) {
      this.link.blur();
    }
  };

  render() {
    const {
      to, external, children, preventToggle, keepFocus, ...attributes
    } = this.props;

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
        innerRef={(c) => {
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
Link.contextTypes = contextTypes;

export default Link;
