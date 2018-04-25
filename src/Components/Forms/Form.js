import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Formik } from 'formik';
import FormText from './FormText';
import FormInput from './FormInput';
import FormPicker from '../../Extend/Forms/FormPicker';
import FormDatePicker from '../../Extend/Forms/FormDatePicker';
import FormChoice from './FormChoice';
import FormCheckbox from './FormCheckbox';
import FormSubmitButton from './FormSubmitButton';
import FormResetButton from './FormResetButton';

const propTypes = {
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  validate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

const defaultProps = {
  validate: null,
  className: null,
};

class Form extends React.Component {
  static Text = FormText;
  static Input = FormInput;
  static Picker = FormPicker;
  static DatePicker = FormDatePicker;
  static Choice = FormChoice;
  static Checkbox = FormCheckbox;
  static SubmitButton = FormSubmitButton;
  static ResetButton = FormResetButton;

  render() {
    const {
      children, className, initialValues, validate, onSubmit, ...attributes
    } = this.props;

    const classes = cx('form', className);

    return (
      <Formik
        initialValues={initialValues}
        validateOnBlur={false}
        validateOnChange={false}
        validate={validate}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form {...attributes} onSubmit={handleSubmit} className={classes}>
            {children}
          </form>
        )}
      />
    );
  }
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

export default Form;
