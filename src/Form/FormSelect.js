import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  size: null,
  info: null,
};

function FormPicker({ legend, size, info, input, meta, children }) {
  const fieldsetClasses = cx('form-group', { 'has-danger': meta.error });

  const selectClasses = cx('form-control custom-select', {
    'form-control-danger': meta.error,
    'form-control-sm': size === 'sm',
  });

  return (
    <fieldset className={fieldsetClasses}>
      {legend && <legend className="form-group-legend">{legend}</legend>}
      <select {...input} className={selectClasses}>
        {children}
      </select>
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

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
