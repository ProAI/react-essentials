import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useActionElement from '../../hooks/useActionElement';
import ActionPropTypes from '../../utils/ActionPropTypes';

const propTypes = {
  ...ActionPropTypes,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  block: PropTypes.bool,
};

const FormButton = React.forwardRef(function FormButton(props, ref) {
  const {
    type,
    color = 'primary',
    size,
    active,
    block = false,
    onPress,
    ...elementProps
  } = props;

  const form = useFormikContext();

  const disabled = form.isSubmitting;

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

  const handlePress = event => {
    if (onPress) {
      onPress(event);
    }

    if (type === 'submit') {
      form.submitForm();
    }

    if (type === 'reset') {
      form.resetForm();
    }
  };

  const createElement = useActionElement(
    BaseTouchable,
    {
      ...elementProps,
      disabled,
      onPress: handlePress,
    },
    ref,
  );

  return createElement({
    className: classes,
  });
});

FormButton.displayName = 'FormButton';
FormButton.propTypes = propTypes;

export default FormButton;
