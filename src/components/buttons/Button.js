import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import useTrigger, { TriggerPropTypes } from '../../hooks/useTrigger';
import useLink, { LinkPropTypes } from '../../hooks/useLink';
import concatClasses from '../../utils/concatClasses';
import concatTouchableProps from '../../utils/concatTouchableProps';
import optional from '../../utils/optional';

const propTypes = {
  ...TriggerPropTypes,
  ...LinkPropTypes,
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  outline: PropTypes.bool,
  block: PropTypes.bool,
  caret: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
};

const Button = React.forwardRef((props, ref) => {
  const {
    color = 'primary',
    size,
    outline = false,
    block = false,
    caret = false,
    toggle,
    dismiss,
    target,
    to,
    replace = false,
    external = false,
    keepFocus = false,
    active = false,
    disabled = false,
    ...elementProps
  } = props;

  const trigger = useTrigger(toggle, dismiss, target);
  const link = useLink(to, replace, external);
  const action = useAction(keepFocus);

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
    ...concatClasses(trigger),
  );

  return (
    <BaseTouchable
      {...concatTouchableProps({ ...elementProps, ref }, action, link, trigger)}
      {...optional(active, { 'aria-pressed': true })}
      disabled={disabled}
      essentials={{ className: classes }}
    />
  );
});

Button.displayName = 'Button';
Button.propTypes = propTypes;

export default Button;
