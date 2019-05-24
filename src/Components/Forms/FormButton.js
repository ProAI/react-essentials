import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormikProvider } from 'formik';
import cx from 'classnames';
import BaseTouchable from '../../utils/rnw-compat/BaseTouchable';
import { BUTTON_COLORS, SIZES } from '../../utils/constants';
import useActionElement from '../../hooks/useActionElement';
import action from '../../utils/action';

const propTypes = {
  // eslint-disable-next-line react/forbid-foreign-prop-types
  ...action.propTypes,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']).isRequired,
  color: PropTypes.oneOf(BUTTON_COLORS),
  size: PropTypes.oneOf(SIZES),
  block: PropTypes.bool,
};

const defaultProps = {
  ...action.defaultProps,
  color: 'primary',
  size: null,
  block: false,
};

const FormButton = React.forwardRef(function FormButton(props, ref) {
  const { type, color, size, active, block, onPress, ...elementProps } = props;

  // eslint-disable-next-line no-underscore-dangle
  const formik = useContext(FormikProvider._context);

  const disabled = formik.isSubmitting;

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
      formik.handleSubmit(event);
    }

    if (type === 'reset') {
      formik.handleReset();
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
FormButton.defaultProps = defaultProps;

export default FormButton;
