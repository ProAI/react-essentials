import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  label: PropTypes.string.isRequired,
  info: PropTypes.string,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  info: null,
  formatError: null,
};

const FormCheckbox = React.forwardRef(function FormCheckbox(props, ref) {
  const { name, title, label, info, formatError } = props;

  const identifier = useIdentifier('re-form-');
  const form = useFormikContext();

  const classes = cx(
    // constant classes
    'custom-control',
    'custom-checkbox',
  );

  const inputClasses = cx(
    // constant classes
    'custom-control-input',
    // variable classes
    form.touched[name] && form.errors[name] && 'is-invalid',
  );

  const error = formatError
    ? formatError(form.errors[name])
    : form.errors[name];

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <Field error={error} touched={form.touched[name]} info={info}>
      {title && <legend className="form-group-legend">{title}</legend>}
      <div className={classes}>
        <input
          ref={ref}
          type="checkbox"
          id={`${identifier}-${name}`}
          name={name}
          checked={form.values[name]}
          value={form.values[name]}
          onChange={event => {
            form.setFieldError(name, null);

            form.setFieldValue(name, event.target.checked);
          }}
          onBlur={form.handleBlur}
          onKeyDown={event => {
            // Submit form on enter
            if (event.keyCode === 13) {
              event.preventDefault();

              form.submitForm();
            }
          }}
          className={inputClasses}
        />
        <label
          className="custom-control-label"
          htmlFor={`${identifier}-${name}`}
        >
          {label}
        </label>
      </div>
    </Field>
  );
  /* eslint-enable */
});

FormCheckbox.displayName = 'FormCheckbox';
FormCheckbox.propTypes = propTypes;
FormCheckbox.defaultProps = defaultProps;

export default FormCheckbox;
