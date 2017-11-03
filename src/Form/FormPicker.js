import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import Field from './Field';
import { generateKey } from '../utils';

const propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.node,
  })).isRequired,
  info: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  formatError: PropTypes.func,
  // formik props
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const defaultProps = {
  title: null,
  placeholder: '',
  size: null,
  info: null,
  clearable: false,
  searchable: false,
  multiple: false,
  formatError: null,
};

class FormPicker extends React.Component {
  constructor(props) {
    super(props);

    if (props.field.value === undefined) {
      throw Error(`There is no initial value for field "${props.field.name}"`);
    }
  }

  identifier = generateKey('re-form-');

  render() {
    const {
      title,
      placeholder,
      size,
      options,
      info,
      multiple,
      clearable,
      searchable,
      formatError,
      field: { name, ...field },
      form,
    } = this.props;

    const classes = cx('form-picker', {
      'is-invalid': form.touched[name] && form.errors[name],
      'form-picker-sm': size === 'sm',
    });

    const error = formatError ? formatError(form.errors[name]) : form.errors[name];

    return (
      <Field error={error} touched={form.touched[name]} info={info}>
        {title && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {title}
          </label>
        )}
        <Select
          inputProps={{ id: `${this.identifier}-${name}` }}
          instanceId={`${this.identifier}-${name}`}
          options={options}
          value={field.value}
          onChange={(value) => {
            form.setFieldError(name, null);

            // split value if multiple is enabled to get an array of values
            if (multiple) {
              form.setFieldValue(name, value.split(','));
              return;
            }

            form.setFieldValue(name, value);
          }}
          onBlur={() => form.setFieldTouched(name, true)}
          placeholder={placeholder}
          className={classes}
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
