import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

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

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  size: null,
  active: false,
  disabled: false,
  block: false,
  caret: false,
};

const Button = React.forwardRef(function Button(props, ref) {
  const {
    color,
    size,
    active,
    disabled,
    block,
    caret,
    ...elementProps
  } = props;

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

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
