import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseText } from '../../utils/components';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import { createButtonProps } from '../../utils';

const propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  external: PropTypes.bool,
  preventToggle: PropTypes.bool,
  keepFocus: PropTypes.bool,
};

const contextTypes = {
  onToggle: PropTypes.func,
};

const defaultProps = {
  to: null,
  onClick: null,
  variant: 'primary',
  size: 'md',
  external: false,
  preventToggle: false,
  keepFocus: false,
};

function ButtonView(props, context) {
  const {
    variant, size, to, external, onClick, preventToggle, keepFocus, ...otherProps
  } = props;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${variant}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
  );

  const buttonProps = createButtonProps(props, context);

  return <BaseText {...otherProps} {...buttonProps} className={classes} blockOnly />;
}

ButtonView.propTypes = propTypes;
ButtonView.defaultProps = defaultProps;
ButtonView.contextTypes = contextTypes;

export default ButtonView;
