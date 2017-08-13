import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';

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

function FormSelect({ legend, size, info, input, meta, children }) {
  const selectClasses = cx('custom-select', {
    'is-invalid': meta.error,
    'custom-control-sm': size === 'sm',
  });

  return (
    <Field meta={meta} info={info}>
      {legend &&
        <legend className="form-group-legend">
          {legend}
        </legend>}
      <select {...input} className={selectClasses}>
        {children}
      </select>
    </Field>
  );
}

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

export default FormSelect;
