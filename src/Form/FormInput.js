import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['color', 'email', 'number', 'password', 'range', 'tel', 'text', 'url']),
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  formatError: PropTypes.func,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  placeholder: '',
  type: 'text',
  size: null,
  info: null,
  multiline: false,
  autoFocus: false,
  formatError: null,
};

class FormInput extends React.Component {
  constructor(props) {
    super(props);

    if (props.field.value === undefined) {
      throw Error(`There is no initial value for field "${props.field.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
    const {
      title,
      placeholder,
      type,
      size,
      info,
      multiline,
      autoFocus,
      formatError,
      field: { name, ...field },
      form,
    } = this.props;

    const inputClasses = cx('form-control', {
      'is-invalid': form.touched[name] && form.errors[name],
      'form-control-sm': size === 'sm',
    });

    const error = formatError ? formatError(form.errors[name]) : form.errors[name];

    /* eslint-disable jsx-a11y/no-autofocus */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {title}
          </label>
        )}
        {!multiline && (
          <input
            type={type}
            id={`${this.identifier}-${name}`}
            name={name}
            value={field.value || ''}
            onChange={(event) => {
              form.setFieldError(name, null);

              field.onChange(event);
            }}
            onBlur={field.onBlur}
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
              form.setFieldError(name, null);

              field.onChange(event);
            }}
            onBlur={field.onBlur}
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
