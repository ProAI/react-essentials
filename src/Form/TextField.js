import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputType: PropTypes.oneOf([
    'color',
    'date',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'range',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]),
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  multiline: PropTypes.bool,
};

const contextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  label: null,
  placeholder: null,
  inputType: 'text',
  size: null,
  info: null,
  multiline: false,
};

function TextField(
  { label, placeholder, inputType, size, info, input, meta, multiline },
  { form },
) {
  const fieldsetClasses = cx('form-group', { 'has-danger': meta.error });

  const labelClasses = cx('form-control-label', { active: meta.active });

  const inputClasses = cx('form-control', {
    'form-control-danger': meta.error,
    'form-control-sm': size === 'sm',
  });

  return (
    <fieldset className={fieldsetClasses}>
      {label && <label htmlFor={`${form}-${input.name}`} className={labelClasses}>{label}</label>}
      {!multiline &&
        <input
          {...input}
          id={`${form}-${input.name}`}
          placeholder={placeholder}
          type={inputType}
          className={inputClasses}
        />}
      {multiline &&
        <textarea
          {...input}
          id={`${form}-${input.name}`}
          placeholder={placeholder}
          rows="7"
          className={inputClasses}
        />}
      {meta.touched &&
        meta.error &&
        <div className="text-danger">
          {meta.error}
        </div>}
      {info &&
        <div className="text-muted">
          {info}
        </div>}
    </fieldset>
  );
}

TextField.propTypes = propTypes;
TextField.contextTypes = contextTypes;
TextField.defaultProps = defaultProps;

export default TextField;
