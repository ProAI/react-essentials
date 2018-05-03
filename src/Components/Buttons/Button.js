import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  variant: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  caret: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  ...action.defaultProps,
  variant: 'primary',
  size: 'md',
  caret: false,
};

function Button(props, context) {
  const {
    variant, size, caret, ...otherProps
  } = props;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${variant}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    caret && 'dropdown-toggle',
  );

  const buttonProps = action.createButtonProps(otherProps, context);

  return <BaseText {...buttonProps} className={classes} blockOnly />;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;
