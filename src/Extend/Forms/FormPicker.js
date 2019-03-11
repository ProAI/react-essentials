import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import Field from '../../Components/Forms/Field';
import { contextTypes as essentialsContextTypes } from '../../utils';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ).isRequired,
  info: PropTypes.string,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  multiple: PropTypes.bool,
  formatError: PropTypes.func,
};

const contextTypes = {
  ...essentialsContextTypes,
  // eslint-disable-next-line react/forbid-prop-types
  formik: PropTypes.object.isRequired,
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
  constructor(props, context) {
    super(props, context);

    this.identifier = context.essentials.generateKey('re-form-');

    if (context.formik.values[props.name] === undefined) {
      throw Error(`There is no initial value for field "${props.name}"`);
    }
  }

  render() {
    const {
      name,
      title,
      placeholder,
      size,
      options,
      info,
      multiple,
      clearable,
      searchable,
      formatError,
    } = this.props;

    const { formik } = this.context;

    const classes = cx(
      // constant classes
      'form-picker',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
      size === 'sm' && 'form-picker-sm',
    );

    const error = formatError ? formatError(formik.errors[name]) : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && (
          <label htmlFor={`${this.identifier}-${name}`} className="form-control-label">
            {title}
          </label>
        )}
        <Select
          inputProps={{ id: `${this.identifier}-${name}` }}
          instanceId={`${this.identifier}-${name}`}
          options={options}
          value={formik.values[name]}
          onChange={value => {
            formik.setFieldError(name, null);

            // split value if multiple is enabled to get an array of values
            if (multiple) {
              formik.setFieldValue(name, value.split(','));
              return;
            }

            formik.setFieldValue(name, value);
          }}
          onBlur={() => formik.setFieldTouched(name, true)}
          placeholder={placeholder}
          className={classes}
          multi={multiple}
          clearable={clearable}
          searchable={searchable}
          simpleValue
        />
      </Field>
    );
    /* eslint-enable */
  }
}

FormPicker.propTypes = propTypes;
FormPicker.contextTypes = contextTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
