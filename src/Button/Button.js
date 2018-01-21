import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'danger',
    'light',
    'dark',
    'link',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  onClick: PropTypes.func,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  className: null,
  type: 'button',
  variant: 'primary',
  size: null,
  onClick: null,
  preventToggle: false,
  keepFocus: false,
};

class Button extends React.Component {
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
      variant, size, type, className, preventToggle, keepFocus, ...attributes
    } = this.props;

    const classes = cx(
      'btn',
      `btn-${variant}`,
      { 'btn-sm': size === 'sm' },
      { 'btn-lg': size === 'lg' },
      className,
    );

    return (
      <button
        {...attributes}
        type={type}
        className={classes}
        onClick={this.onClick}
        ref={(c) => {
          this.button = c;
        }}
      />
    );
  }
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;
