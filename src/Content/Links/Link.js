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

    // action link
    if (!to) {
      return (
        <a
          {...attributes}
          role="button"
          tabIndex="0"
          ref={(c) => {
            this.link = c;
          }}
          onKeyPress={/* TODO */ () => {}}
          onClick={this.onClick}
        >
          {children}
        </a>
      );
    }

    // external link
    if (external) {
      return (
        <a
          {...attributes}
          ref={(c) => {
            this.link = c;
          }}
          href={to}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    // router link
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
