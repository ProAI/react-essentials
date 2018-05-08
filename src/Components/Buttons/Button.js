import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import { action } from '../../utils';

const propTypes = {
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  caret: PropTypes.bool,
};

const contextTypes = {
  ...action.contextTypes,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  size: null,
  caret: false,
};

function Button(props, context) {
  const {
    children, color, size, caret, ...elementProps
  } = props;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${color}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    caret && 'dropdown-toggle',
  );

  const buttonProps = action.createButtonProps(elementProps, context);

  return (
    <BaseText {...buttonProps} className={classes} blockOnly>
      {children}
    </BaseText>
  );
}

Button.propTypes = propTypes;
Button.contextTypes = contextTypes;
Button.defaultProps = defaultProps;

export default Button;
