import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { contextTypes as essentialsContextTypes } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
};

const contextTypes = {
  ...essentialsContextTypes,
  // eslint-disable-next-line react/forbid-prop-types
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

    this.identifier = context.essentials.generateKey('re-form-');

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  render() {
    const { name, title, label, info, size, formatError } = this.props;

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
          <label className="custom-control-label" htmlFor={`${this.identifier}-${name}`}>
            {label}
          </label>
        </div>
      </Field>
    );
    /* eslint-enable */
  }
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.contextTypes = contextTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
