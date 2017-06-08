import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  preventFocus: PropTypes.bool,
};

const defaultProps = {
  preventFocus: true,
};

class ActionLink extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    this.props.onClick(event);

    if (this.props.preventFocus) {
      this.link.blur();
    }
  };

  render() {
    const { children, preventFocus, ...attributes } = this.props;

    // action link
    return <a {...attributes} role="button" aria-expanded="true">{children}</a>;
  }
}

ActionLink.propTypes = propTypes;
ActionLink.defaultProps = defaultProps;

export default ActionLink;
