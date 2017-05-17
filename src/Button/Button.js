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
    'link',
    'option',
  ]),
  size: PropTypes.oneOf(['sm', 'lg']),
  onClick: PropTypes.func,
  preventToggle: PropTypes.bool,
  preventFocus: PropTypes.bool,
};

const contextTypes = {
  toggle: PropTypes.func,
};

const defaultProps = {
  className: null,
  type: 'button',
  variant: 'primary',
  size: null,
  onClick: null,
  preventToggle: false,
  preventFocus: false,
};

class Button extends React.Component {
  onClick = (event) => {
    event.preventDefault();

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.context.toggle !== undefined && !this.props.preventToggle) {
      this.context.toggle();
    }

    if (this.props.preventFocus) {
      this.button.blur();
    }
  };

  render() {
    const { variant, size, type, className, ...attributes } = this.props;
    delete attributes.preventToggle;
    delete attributes.preventFocus;

    const classes = variant === 'option'
      ? cx('btn-option', className)
      : cx(
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
