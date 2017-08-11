import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';

const propTypes = {
  legend: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
  size: null,
};

function FormCheckbox({ legend, label, info, size, input, meta }) {
  const classes = cx('custom-control custom-checkbox', {
    'custom-control-sm': size === 'sm',
  });

  return (
    <Field meta={meta} info={info}>
      {legend &&
        <legend className="form-group-legend">
          {legend}
        </legend>}
      <label className={classes} htmlFor={`${meta.form}-${input.name}`}>
        <input
          type="checkbox"
          id={`${meta.form}-${input.name}`}
          name={input.name}
          checked={input.value}
          onChange={input.onChange}
          onFocus={input.onFocus}
          onBlur={() => {
            input.onBlur(input.value);
          }}
          className="custom-control-input"
        />
        <div className="custom-control-indicator" />
        <div className="custom-control-description">
          {label}
        </div>
      </label>
    </Field>
  );
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
