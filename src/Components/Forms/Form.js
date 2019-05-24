import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import BaseView from '../../utils/rnw-compat/BaseView';
import FormButton from './FormButton';
import FormInput from './FormInput';
import FormPicker from './FormPicker';
import FormDatePicker from './FormDatePicker';
import FormChoice from './FormChoice';
import FormCheckbox from './FormCheckbox';

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  initialValues: PropTypes.object.isRequired,
  validate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

const defaultProps = {
  validate: null,
};

const Form = React.forwardRef(function Form(props, ref) {
  const {
    children,
    initialValues,
    validate,
    onSubmit,
    ...elementProps
  } = props;

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validate={validate}
      onSubmit={onSubmit}
      render={form => (
        <BaseView
          {...elementProps}
          ref={ref}
          accessibilityRole="form"
          essentials={{ className: 'form' }}
        >
          {typeof children === 'function' ? children(form) : children}
        </BaseView>
      )}
    />
  );
});

Form.displayName = 'Form';
Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Button = FormButton;
Form.Input = FormInput;
Form.Picker = FormPicker;
Form.DatePicker = FormDatePicker;
Form.Choice = FormChoice;
Form.Checkbox = FormCheckbox;

export default Form;
