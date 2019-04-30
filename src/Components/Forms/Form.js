import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import BaseView from '../../utils/rnw-compat/BaseView';
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

function Form(props) {
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
          onSubmit={form.handleSubmit}
          essentials={{ tag: 'form', className: 'form' }}
        >
          {typeof children === 'function' ? children(form) : children}
        </BaseView>
      )}
    />
  );
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.Input = FormInput;
Form.Picker = FormPicker;
Form.DatePicker = FormDatePicker;
Form.Choice = FormChoice;
Form.Checkbox = FormCheckbox;

export default Form;
