import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Field as FormikField } from 'formik';
import Field from './Field';
import Context from '../../Context';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  info: null,
  formatError: null,
};

class FormCheckbox extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');

    this.renderField = this.renderField.bind(this);
  }

  renderField({ form: formik }) {
    const { name, title, label, info, formatError } = this.props;

    const classes = cx(
      // constant classes
      'custom-control',
      'custom-checkbox',
    );

    const inputClasses = cx(
      // constant classes
      'custom-control-input',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
    );

    const error = formatError
      ? formatError(formik.errors[name])
      : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <div className={classes}>
          <input
            type="checkbox"
            id={`${this.identifier}-${name}`}
            name={name}
            checked={formik.values[name] || false}
            onChange={event => {
              formik.setFieldError(name, null);
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            className={inputClasses}
          />
          <label
            className="custom-control-label"
            htmlFor={`${this.identifier}-${name}`}
          >
            {label}
          </label>
        </div>
      </Field>
    );
    /* eslint-enable */
  }

  render() {
    const { name } = this.props;

    return <FormikField name={name} render={this.renderField} />;
  }
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
