import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';

const propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  info: PropTypes.string,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  legend: null,
  size: null,
  info: null,
};

function FormSelect({
  children, legend, size, info, field: { name, ...field }, form,
}) {
  const selectClasses = cx('custom-select', {
    'is-invalid': form.errors[name],
    'custom-control-sm': size === 'sm',
  });

  return (
    <Field error={form.errors[name]} info={info}>
      {legend && <legend className="form-group-legend">{legend}</legend>}
      <select name={name} className={selectClasses} {...field}>
        {children}
      </select>
    </Field>
  );
}

FormSelect.propTypes = propTypes;
FormSelect.defaultProps = defaultProps;

export default FormSelect;
