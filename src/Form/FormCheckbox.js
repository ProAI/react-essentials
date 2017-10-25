import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  legend: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
  size: null,
};

class FormCheckbox extends React.Component {
  identifier = generateKey('re-form-');

  render() {
    const {
      legend, label, info, size, field: { name, ...field }, form,
    } = this.props;
    const classes = cx('custom-control custom-checkbox', {
      'custom-control-sm': size === 'sm',
    });
    const inputClasses = cx('custom-control-input', {
      'is-invalid': form.errors[name],
    });

    return (
      <Field error={form.errors[name]} info={info}>
        {legend && <legend className="form-group-legend">{legend}</legend>}
        <label className={classes} htmlFor={`${this.identifier}-${name}`}>
          <input
            type="checkbox"
            id={`${this.identifier}-${name}`}
            name={name}
            checked={field.value || false}
            onChange={field.onChange}
            onBlur={field.onBlur}
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
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
