import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
};

const contextTypes = {
  formik: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  info: null,
  size: null,
  formatError: null,
};

class FormCheckbox extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.identifier = generateKey('re-form-');

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  render() {
    const {
      name, title, label, info, size, formatError,
    } = this.props;

    const { formik } = this.context;

    const classes = cx(
      // constant classes
      'custom-control',
      'custom-checkbox',
      // variable classes
      size === 'sm' && 'custom-control-sm',
    );

    const inputClasses = cx(
      // constant classes
      'custom-control-input',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
    );

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <label className={classes} htmlFor={`${this.identifier}-${name}`}>
          <input
            type="checkbox"
            id={`${this.identifier}-${name}`}
            name={name}
            checked={formik.values[name] || false}
            onChange={(event) => {
              formik.setFieldError(name, null);
              formik.handleChange(event);
            }}
            onBlur={formik.handleBlur}
            className={inputClasses}
          />
          <div className="custom-control-indicator" />
          <div className="custom-control-description">{label}</div>
        </label>
      </Field>
    );
  }
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.contextTypes = contextTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
