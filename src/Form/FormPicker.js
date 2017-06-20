import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';

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

const contextTypes = {
  form: PropTypes.string.isRequired,
};

const defaultProps = {
  label: null,
  size: null,
  info: null,
  clearable: false,
  searchable: false,
  multiple: false,
};

function FormPicker(
  { label, size, options, info, input, meta, multiple, clearable, searchable },
  { form },
) {
  const fieldsetClasses = cx('form-group', { 'has-danger': meta.error });

  const labelClasses = cx('form-control-label', { active: meta.active });

  const classes = cx({
    'form-control-danger': meta.error,
    'form-control-sm': size === 'sm',
  });

  return (
    <fieldset className={fieldsetClasses}>
      {label && <label htmlFor={`${form}-${input.name}`} className={labelClasses}>{label}</label>}
      <Select
        inputProps={{ id: `${form}-${input.name}` }}
        instanceId={`${form}-${input.name}`}
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
FormPicker.contextTypes = contextTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
