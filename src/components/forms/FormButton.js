import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import { applyDisabled, applyActive } from '../../utils/states';
import useAction from '../../hooks/useAction';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  block: PropTypes.bool,
};

const FormButton = React.forwardRef((props, ref) => {
  const { type, onPress: handlePress, ...elementProps } = props;

  const form = useFormikContext();

  const {
    color = 'primary',
    size,
    active,
    block = false,
    disabled,
    onPress,
    ...actionProps
  } = useAction(
    {
      ...elementProps,
      disabled: form.isSubmitting,
      onPress: (event) => {
        if (handlePress) handlePress(event);

        if (type === 'submit') {
          form.submitForm();
        }

        if (type === 'reset') {
          form.resetForm();
        }
      },
    },
    ref,
  );

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
  );

  return (
    <BaseTouchable
      {...applyDisabled(applyActive(actionProps, active), disabled)}
      disabled={disabled}
      essentials={{ className: classes }}
    />
  );
});

FormButton.displayName = 'FormButton';
FormButton.propTypes = propTypes;

export default FormButton;
