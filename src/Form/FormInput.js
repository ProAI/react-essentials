import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['color', 'email', 'number', 'password', 'range', 'tel', 'text', 'url']),
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  label: null,
  placeholder: null,
  type: 'text',
  size: null,
  info: null,
  multiline: false,
  autoFocus: false,
};

class FormInput extends React.Component {
  identifier = generateKey('re-form-');

  render() {
    const {
      label,
      placeholder,
      type,
      size,
      info,
      multiline,
      autoFocus,
      field: { name, ...field },
      form,
    } = this.props;

    const inputClasses = cx('form-control', {
      'is-invalid': !form.touched[name] && form.errors[name],
      'form-control-sm': size === 'sm',
    });

    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <Field error={form.errors[name]} touched={form.touched[name]} info={info}>
        {label && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {label}
          </label>
        )}
        {!multiline && (
          <input
            type={type}
            id={`${this.identifier}-${name}`}
            name={name}
            value={field.value || ''}
            onChange={(event) => {
              if (!form.touched[name]) form.setFieldTouched(name, true);
              field.onChange(event);
            }}
            placeholder={placeholder}
            className={inputClasses}
            autoFocus={autoFocus}
          />
        )}
        {multiline && (
          <textarea
            id={`${this.identifier}-${name}`}
            name={name}
            value={field.value || ''}
            onChange={(event) => {
              if (!form.touched[name]) form.setFieldTouched(name, true);
              field.onChange(event);
            }}
            placeholder={placeholder}
            rows="7"
            className={inputClasses}
            autoFocus={autoFocus}
          />
        )}
      </Field>
    );
    /* eslint-enable */
  }
}

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
