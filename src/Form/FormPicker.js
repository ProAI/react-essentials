import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  label: null,
  size: null,
  info: null,
  clearable: false,
  searchable: false,
  multiple: false,
};

class FormPicker extends React.Component {
  identifier = generateKey('re-form-');

  render() {
    const {
      label,
      size,
      options,
      info,
      multiple,
      clearable,
      searchable,
      field: { name, ...field },
      form,
    } = this.props;

    const classes = cx('form-picker', {
      'is-invalid': form.errors[name],
      'form-picker-sm': size === 'sm',
    });

    return (
      <Field error={form.errors[name]} info={info}>
        {label && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {label}
          </label>
        )}
        <Select
          inputProps={{ id: `${this.identifier}-${name}` }}
          instanceId={`${this.identifier}-${name}`}
          className={classes}
          options={options}
          value={field.value}
          onChange={(value) => {
            // split value if multiple is enabled to get an array of values
            if (multiple) {
              form.setFieldValue(name, value.split(','));
              return;
            }

            form.setFieldValue(name, value);
          }}
          onBlur={() => form.setFieldTouched(name, true)}
          multi={multiple}
          clearable={clearable}
          searchable={searchable}
          simpleValue
        />
      </Field>
    );
  }
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
