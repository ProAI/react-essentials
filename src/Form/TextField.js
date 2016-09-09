import React, { PropTypes } from 'react';

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
  info: PropTypes.string,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  multiline: PropTypes.bool,
};

const contextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  inputType: 'text',
  multiline: false,
};

function TextField({ label, placeholder, inputType, info, input, meta, multiline }, { form }) {
  const fieldsetClasses = classNames([
    'form-group',
    { 'has-danger': meta.error },
  ]);

  const labelClasses = classNames([
    'form-control-label',
    { active: meta.active },
  ]);

  const inputClasses = classNames([
    'form-control',
    { 'form-control-danger': meta.error },
  ]);

  return (
    <fieldset className={fieldsetClasses}>
      {label && (
        <label htmlFor={`${form}-${input.name}`} className={labelClasses}>{label}</label>
      )}
      {!multiline && (
        <input
          {...input}
          id={`${form}-${input.name}`}
          placeholder={placeholder}
          type={inputType}
          className={inputClasses}
        />
      )}
      {multiline && (
        <textarea
          {...input}
          id={`${form}-${input.name}`}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      {meta.touched && meta.error && (
        <small className="text-danger">
          {meta.error}
        </small>
      )}
      {info && (
        <small className="text-muted">
          {info}
        </small>
      )}
    </fieldset>
  );
}

TextField.propTypes = propTypes;
TextField.contextTypes = contextTypes;
TextField.defaultProps = defaultProps;

export default TextField;
