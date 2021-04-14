import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useAction, { ActionPropTypes } from '../../hooks/useAction';
import concatProps from '../../utils/concatProps';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  block: PropTypes.bool,
  disabled: PropTypes.bool,
};

const FormButton = React.forwardRef((props, ref) => {
  const {
    type,
    color = 'primary',
    size,
    block = false,
    keepFocus = false,
    disabled = false,
    ...elementProps
  } = props;

  const form = useFormikContext();
  const action = useAction(keepFocus, () => {
    if (type === 'submit') {
      form.submitForm();
    }

    if (type === 'reset') {
      form.resetForm();
    }
  });

  const buttonDisabled = disabled || form.isSubmitting;

  const classes = cx(
    // constant classes
    'btn',
    `btn-${color}`,
    // variable classes
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    buttonDisabled && 'disabled',
    block && 'btn-block',
  );

  return (
    <BaseTouchable
      {...concatProps({ ...elementProps, ref }, action)}
      disabled={buttonDisabled}
      essentials={{ className: classes }}
    />
  );
});

FormButton.displayName = 'FormButton';
FormButton.propTypes = propTypes;

export default FormButton;
