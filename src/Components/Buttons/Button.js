import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useActionElement from '../../hooks/useActionElement';
import { actionPropTypes } from '../../utils/props';

const propTypes = {
  ...actionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  outline: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  caret: PropTypes.bool,
};

const Button = React.forwardRef(function Button(props, ref) {
  const {
    color = 'primary',
    size,
    outline = false,
    active = false,
    disabled = false,
    block = false,
    caret = false,
    ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'btn',
    outline ? `btn-outline-${color}` : `btn-${color}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    active && 'active',
    disabled && 'disabled',
    block && 'btn-block',
    caret && 'dropdown-toggle',
  );

  const createElement = useActionElement(
    BaseTouchable,
    {
      disabled,
      ...elementProps,
    },
    ref,
  );

  return createElement({
    className: classes,
  });
});

Button.displayName = 'Button';
Button.propTypes = propTypes;

export default Button;
