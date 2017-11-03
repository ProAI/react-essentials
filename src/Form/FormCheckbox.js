import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  formatError: PropTypes.func,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  info: null,
  size: null,
  formatError: null,
};

class FormCheckbox extends React.Component {
  constructor(props) {
    super(props);

    if (props.field.value === undefined) {
      throw Error(`There is no initial value for field "${props.field.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
    const {
      title, label, info, size, formatError, field: { name, ...field }, form,
    } = this.props;
    const classes = cx('custom-control custom-checkbox', {
      'custom-control-sm': size === 'sm',
    });
    const inputClasses = cx('custom-control-input', {
      'is-invalid': form.touched[name] && form.errors[name],
    });

    const error = formatError ? formatError(form.errors[name]) : form.errors[name];

    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && <legend className="form-group-legend">{title}</legend>}
        <label className={classes} htmlFor={`${this.identifier}-${name}`}>
          <input
            type="checkbox"
            id={`${this.identifier}-${name}`}
            name={name}
            checked={field.value || false}
            onChange={(event) => {
              form.setFieldError(name, null);
              field.onChange(event);
            }}
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
