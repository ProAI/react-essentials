import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

const propTypes = {
  legend: PropTypes.string,
  info: PropTypes.string,
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  info: null,
};

function FormFileInput({ legend, info, input, meta }) {
  return (
    <Field meta={meta} info={info}>
      {legend && <legend className="form-group-legend">{legend}</legend>}
      <label className="custom-file" htmlFor={`${meta.form}-${input.name}`}>
        <input type="file" id={`${meta.form}-${input.name}`} className="custom-file-input" />
        <span className="custom-file-control" />
      </label>
    </Field>
  );
}

FormFileInput.propTypes = propTypes;
FormFileInput.defaultProps = defaultProps;

export default FormFileInput;
