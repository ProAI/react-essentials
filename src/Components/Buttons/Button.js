import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseTouchable } from '../../utils/components';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import { action } from '../../utils';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  caret: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  size: null,
  active: false,
  disabled: false,
  block: false,
  caret: false,
};

function Button(props, context) {
  const { children, color, size, active, disabled, block, caret, ...elementProps } = props;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${color}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    active && 'active',
    disabled && 'disabled',
    block && 'btn-block',
    caret && 'dropdown-toggle',
  );

  const buttonProps = action.createButtonProps(elementProps, context);

  return (
    <BaseTouchable {...buttonProps} className={classes}>
      {children}
    </BaseTouchable>
  );
}

Button.propTypes = propTypes;
Button.contextTypes = contextTypes;
Button.defaultProps = defaultProps;

export default Button;
