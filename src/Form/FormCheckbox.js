import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
  legend: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  // redux form props
  input: PropTypes.object,
  meta: PropTypes.object,
};

const defaultProps = {
  legend: null,
  info: null,
  input: null,
  meta: null,
};

function FormCheckbox({ legend, label, info, input, meta }) {
  return (
    <Field meta={meta} info={info}>
      {legend && <legend className="form-group-legend">{legend}</legend>}
      <div className="checkbox">
        <label className="custom-control custom-checkbox" htmlFor={`${meta.form}-${input.name}`}>
          <input
            {...input}
            id={`${meta.form}-${input.name}`}
            type="checkbox"
            className="custom-control-input"
          />
          <div className="custom-control-indicator" />
          <div className="custom-control-description">{label}</div>
        </label>
      </div>
    </Field>
  );
}

FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
