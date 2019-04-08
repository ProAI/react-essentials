import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import { Field as FormikField } from 'formik';
import Field from './Field';
import Context from '../../Context';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  placeholder: PropTypes.string,
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

const defaultProps = {
  title: null,
  placeholder: '',
  info: null,
  clearable: false,
  searchable: false,
  multiple: false,
  formatError: null,
};

class FormPicker extends React.Component {
  static contextType = Context;

  constructor(props, context) {
    super(props, context);

    this.identifier = context.generateKey('re-form-');

    this.renderField = this.renderField.bind(this);
  }

  renderField({ form: formik }) {
    const {
      name,
      title,
      placeholder,
      options,
      info,
      multiple,
      clearable,
      searchable,
      formatError,
    } = this.props;

    const classes = cx(
      // constant classes
      'form-picker',
      // variable classes
      formik.touched[name] && formik.errors[name] && 'is-invalid',
    );

    const error = formatError
      ? formatError(formik.errors[name])
      : formik.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={formik.touched[name]} info={info}>
        {title && (
          <label
            htmlFor={`${this.identifier}-${name}`}
            className="form-control-label"
          >
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
          onBlur={() => {
            formik.setFieldTouched(name, true);
          }}
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

  render() {
    const { name } = this.props;

    return <FormikField name={name} render={this.renderField} />;
  }
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
