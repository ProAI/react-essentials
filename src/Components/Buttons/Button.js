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
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  ...action.defaultProps,
  variant: 'primary',
  size: 'md',
};

function Button(props, context) {
  const { variant, size, ...otherProps } = props;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${variant}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
  );

  const buttonProps = action.createButtonProps(otherProps, context);

  return <BaseText {...buttonProps} className={classes} blockOnly />;
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.contextTypes = contextTypes;

export default Button;
