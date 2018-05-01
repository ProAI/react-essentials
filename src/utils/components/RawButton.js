import React from 'react';
import PropTypes from 'prop-types';
import BaseText from './BaseText';
import BaseView from './BaseView';

const propTypes = {
  type: PropTypes.string,
  to: PropTypes.string.isRequired,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
  isView: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  type: 'button',
  external: false,
  onClick: null,
  preventToggle: false,
  keepFocus: false,
  isView: false,
};

class RawButton extends React.Component {
  onClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.context.onToggle !== undefined && !this.props.preventToggle) {
      this.context.onToggle();
    }

    if (!this.props.keepFocus) {
      this.button.blur();
    }
  };

  render() {
    const {
      type, preventToggle, keepFocus, isView, ...attributes
    } = this.props;

    const BaseTag = isView ? BaseView : BaseText;

    return (
      <BaseTag
        {...attributes}
        tag="button"
        type={type}
        onClick={this.onClick}
        ref={(c) => {
          this.button = c;
        }}
      />
    );
  }
}

RawButton.propTypes = propTypes;
RawButton.defaultProps = defaultProps;
RawButton.contextTypes = contextTypes;

export default RawButton;
