import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import { SIZES } from '../../utils/constants';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'color',
    'email',
    'number',
    'password',
    'range',
    'tel',
    'text',
    'url',
  ]),
  size: PropTypes.oneOf(SIZES),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  autoFocus: PropTypes.bool,
  trimValue: PropTypes.bool,
  convertEmptyValueToNull: PropTypes.bool,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  placeholder: '',
  type: 'text',
  size: null,
  info: null,
  multiline: false,
  autoComplete: 'on',
  autoFocus: false,
  trimValue: false,
  convertEmptyValueToNull: false,
  formatError: null,
};

const FormInput = React.forwardRef(function FormInput(props, ref) {
  const {
    name,
    title,
    placeholder,
    type,
    size,
    info,
    multiline,
    autoComplete,
    autoFocus,
    trimValue,
    convertEmptyValueToNull,
    formatError,
  } = props;

  const identifier = useIdentifier('re-form-');
  const form = useFormikContext();

  const inputClasses = cx(
    // constant classes
    'form-control',
    // variable classes
    form.touched[name] && form.errors[name] && 'is-invalid',
    size === 'sm' && 'form-control-sm',
    size === 'lg' && 'form-control-lg',
  );

  const error = formatError
    ? formatError(form.errors[name])
    : form.errors[name];

  /* eslint-disable jsx-a11y/label-has-for */
  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <Field error={error} touched={form.touched[name]} info={info}>
      {title && (
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      {!multiline && (
        <input
          ref={ref}
          type={type}
          id={`${identifier}-${name}`}
          name={name}
          value={form.values[name] || ''}
          onChange={event => {
            form.setFieldError(name, null);

            const { value } = event.target;

            // Trim value if type is not password
            const trimmedValue =
              trimValue && type !== 'password' ? value.trim() : value;

            // Handle empty string as null
            const nextValue =
              convertEmptyValueToNull && trimmedValue === ''
                ? null
                : trimmedValue;

            form.setFieldValue(name, nextValue);
          }}
          onBlur={form.handleBlur}
          onKeyDown={event => {
            // Submit form on enter
            if (event.keyCode === 13) {
              event.preventDefault();

              form.submitForm();
            }
          }}
          placeholder={placeholder}
          className={inputClasses}
          autoComplete={autoComplete === 'on' ? null : autoComplete}
          autoFocus={autoFocus}
        />
      )}
      {multiline && (
        <textarea
          ref={ref}
          id={`${identifier}-${name}`}
          name={name}
          value={form.values[name] || ''}
          onChange={event => {
            form.setFieldError(name, null);

            form.handleChange(event);
          }}
          onBlur={form.handleBlur}
          placeholder={placeholder}
          rows="7"
          className={inputClasses}
          autoFocus={autoFocus}
        />
      )}
    </Field>
  );
  /* eslint-enable */
});

FormInput.displayName = 'FormInput';
FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
