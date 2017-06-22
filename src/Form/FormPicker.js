import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import Field from './Field';

const propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  // redux form props
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

const defaultProps = {
  label: null,
  size: null,
  info: null,
  clearable: false,
  searchable: false,
  multiple: false,
};

function FormPicker({ label, size, options, info, input, meta, multiple, clearable, searchable }) {
  const labelClasses = cx('form-control-label', { active: meta.active });

  const classes = cx({
    'form-control-danger': meta.error,
    'form-control-sm': size === 'sm',
  });

  return (
    <Field meta={meta} info={info}>
      {label &&
        <label htmlFor={`${meta.form}-${input.name}`} className={labelClasses}>{label}</label>}
      <Select
        inputProps={{ id: `${meta.form}-${input.name}` }}
        instanceId={`${meta.form}-${input.name}`}
        className={classes}
        options={options}
        value={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur(input.value)}
        multi={multiple}
        clearable={clearable}
        searchable={searchable}
        simpleValue
      />
    </Field>
  );
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
