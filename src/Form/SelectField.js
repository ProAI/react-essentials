import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  size: null,
};

function SelectField({ legend, size, input, meta, children }) {
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
        <small className="text-danger">
          {meta.error}
        </small>}
    </fieldset>
  );
}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;

export default SelectField;
