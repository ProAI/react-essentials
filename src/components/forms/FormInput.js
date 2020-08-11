import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import { SIZES } from '../../utils/constants';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
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
  multiline: PropTypes.bool,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  trimValue: PropTypes.bool,
  convertEmptyValueToNull: PropTypes.bool,
};

const FormInput = React.forwardRef(function FormInput(props, ref) {
  const {
    name,
    title,
    placeholder = '',
    type = 'text',
    size,
    info,
    multiline = false,
    autoComplete = 'on',
    autoFocus = false,
    trimValue = false,
    convertEmptyValueToNull = false,
    onValueChange,
    formatError = error => error,
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const sanitizeValue = rawValue => {
    // Trim value if type is not password
    const trimmedValue =
      trimValue && type !== 'password' ? rawValue.trim() : rawValue;

    // Handle empty string as null and return
    return convertEmptyValueToNull && trimmedValue === '' ? null : trimmedValue;
  };

  const inputClasses = cx(
    // constant classes
    'form-control',
    // variable classes
    field.touched && field.error && 'is-invalid',
    size === 'sm' && 'form-control-sm',
    size === 'lg' && 'form-control-lg',
  );

  /* eslint-disable jsx-a11y/label-has-for, jsx-a11y/no-autofocus */
  return (
    <Field
      error={formatError(field.error)}
      touched={field.touched}
      info={info}
      elementProps={elementProps}
    >
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
          value={field.value || ''}
          onChange={event => {
            const nextValue = sanitizeValue(event.target.value);

            field.setValue(nextValue, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
          }}
          onKeyDown={field.handleSubmitOnEnter}
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
          value={field.value || ''}
          onChange={event => {
            const nextValue = sanitizeValue(event.target.value);

            field.setValue(nextValue, onValueChange);
          }}
          onBlur={() => {
            field.setTouched();
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
});

FormInput.displayName = 'FormInput';
FormInput.propTypes = propTypes;

export default FormInput;
