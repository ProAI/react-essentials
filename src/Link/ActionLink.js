import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  keepFocus: PropTypes.bool,
};

const defaultProps = {
  keepFocus: false,
};

class ActionLink extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    this.props.onClick(event);

    if (!this.props.keepFocus) {
      this.link.blur();
    }
  };

  render() {
    const {
      children, onClick, keepFocus, ...attributes
    } = this.props;

    // action link
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
}

ActionLink.propTypes = propTypes;
ActionLink.defaultProps = defaultProps;

export default ActionLink;
