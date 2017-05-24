import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  preventToggle: PropTypes.bool,
  preventFocus: PropTypes.bool,
};

const contextTypes = {
  toggle: PropTypes.func,
};

const defaultProps = {
  preventToggle: true,
  preventFocus: true,
};

class ActionLink extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    this.props.onClick(event);

    if (this.context.toggle !== undefined && !this.props.preventToggle) {
      this.context.toggle();
    }

    if (this.props.preventFocus) {
      this.link.blur();
    }
  };

  render() {
    const { children, preventToggle, preventFocus, ...attributes } = this.props;

    // action link
    return <a {...attributes} role="button" aria-expanded="true">{children}</a>;
  }
}

ActionLink.propTypes = propTypes;
ActionLink.contextTypes = contextTypes;
ActionLink.defaultProps = defaultProps;

export default ActionLink;
