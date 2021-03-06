import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik } from 'formik';
import BaseView from '../../utils/rnw-compat/BaseView';
import FormButton from './FormButton';
import FormCheckbox from './FormCheckbox';
import FormChoice from './FormChoice';
import FormDatePicker from './FormDatePicker';
import FormFileInput from './FormFileInput';
import FormInput from './FormInput';
import FormPicker from './FormPicker';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  validate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  inline: PropTypes.bool,
};

const Form = React.forwardRef((props, ref) => {
  const {
    children,
    initialValues,
    validate,
    onSubmit,
    inline = false,
    ...elementProps
  } = props;

  const classes = cx(
    // variable classes
    inline && 'form-inline',
  );

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
      onSubmit={onSubmit}
    >
      {(form) => (
        <BaseView
          {...elementProps}
          ref={ref}
          accessibilityRole="form"
          essentials={{ className: classes }}
        >
          {typeof children === 'function' ? children(form) : children}
        </BaseView>
      )}
    </Formik>
  );
});

Form.displayName = 'Form';
Form.propTypes = propTypes;

Form.Button = FormButton;
Form.Checkbox = FormCheckbox;
Form.Choice = FormChoice;
Form.DatePicker = FormDatePicker;
Form.FileInput = FormFileInput;
Form.Input = FormInput;
Form.Picker = FormPicker;

export default Form;
