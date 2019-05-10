import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Select from 'react-select';
import Field from './Field';
import Context from '../../Context';
import withFormField from './withFormField';

const propTypes = {
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
  /* eslint-disable react/forbid-prop-types */
  field: PropTypes.any.isRequired,
  form: PropTypes.any.isRequired,
  /* eslint-enable */
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
  }

  render() {
    // TODO: Forward ref to <select> DOM tag.

    const {
      title,
      placeholder,
      options,
      info,
      multiple,
      clearable,
      searchable,
      formatError,
      field: { name, value },
      form,
    } = this.props;

    const classes = cx(
      // constant classes
      'form-picker',
      // variable classes
      form.touched[name] && form.errors[name] && 'is-invalid',
    );

    const error = formatError
      ? formatError(form.errors[name])
      : form.errors[name];

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <Field error={error} touched={form.touched[name]} info={info}>
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
          value={value}
          onChange={nextValue => {
            form.setFieldError(name, null);

            // split value if multiple is enabled to get an array of values
            if (multiple) {
              if (nextValue === '') {
                form.setFieldValue(name, []);
              } else {
                form.setFieldValue(name, nextValue.split(','));
              }

              return;
            }

            form.setFieldValue(name, nextValue);
          }}
          onBlur={() => {
            form.setFieldTouched(name, true);
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
}

FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default withFormField(FormPicker);
