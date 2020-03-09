import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import Select from 'react-select';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';

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

// eslint-disable-next-line no-unused-vars
const FormPicker = React.forwardRef(function FormPicker(props, ref) {
  // TODO: Forward ref to <select> DOM tag.

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
  } = props;

  const identifier = useIdentifier('re-form-');
  const form = useFormikContext();

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
        <label htmlFor={`${identifier}-${name}`} className="form-control-label">
          {title}
        </label>
      )}
      <Select
        inputProps={{ id: `${identifier}-${name}` }}
        instanceId={`${identifier}-${name}`}
        options={options}
        value={form.values[name]}
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
});

FormPicker.displayName = 'FormPicker';
FormPicker.propTypes = propTypes;
FormPicker.defaultProps = defaultProps;

export default FormPicker;
