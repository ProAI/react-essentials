import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.oneOf([
    'color',
    'email',
    'number',
    'password',
    'range',
    'tel',
    'text',
    'url',
  ]),
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  multiline: PropTypes.bool,
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  label: null,
  placeholder: null,
  inputType: 'text',
  size: null,
  info: null,
  multiline: false,
};

function FormInput({ label, placeholder, inputType, size, info, input, meta, multiline }) {
  const labelClasses = cx('form-control-label', { active: meta.active });

  const inputClasses = cx('form-control', {
    'form-control-danger': meta.error,
    'form-control-sm': size === 'sm',
  });

  return (
    <Field meta={meta} info={info}>
      {label &&
        <label htmlFor={`${meta.form}-${input.name}`} className={labelClasses}>{label}</label>}
      {!multiline &&
        <input
          {...input}
          id={`${meta.form}-${input.name}`}
          placeholder={placeholder}
          type={inputType}
          className={inputClasses}
        />}
      {multiline &&
        <textarea
          {...input}
          id={`${meta.form}-${input.name}`}
          placeholder={placeholder}
          rows="7"
          className={inputClasses}
        />}
    </Field>
  );
}

FormInput.propTypes = propTypes;
FormInput.defaultProps = defaultProps;

export default FormInput;
