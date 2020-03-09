import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';

const propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.node,
    }),
  ).isRequired,
  info: PropTypes.string,
  multiple: PropTypes.bool,
  formatError: PropTypes.func,
};

const defaultProps = {
  title: null,
  info: null,
  multiple: false,
  formatError: null,
};

const FormChoice = React.forwardRef(function FormChoice(props, ref) {
  const { name, title, options, info, multiple, formatError } = props;

  const identifier = useIdentifier('re-form-');
  const form = useFormikContext();

  const classes = cx(
    // constant classes
    'custom-control',
    `custom-${multiple ? 'checkbox' : 'radio'}`,
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
      <div className="custom-controls-stacked">
        {options.map((option, key) => (
          <div key={option.value} className={classes}>
            {!multiple && (
              <input
                ref={ref}
                type="radio"
                id={`${identifier}-${name}-${key}`}
                name={name}
                value={option.value}
                checked={form.values[name] === option.value}
                onChange={event => {
                  form.setFieldError(name, null);

                  form.setFieldValue(
                    name,
                    event.target.checked ? option.value : form.values[name],
                  );
                }}
                onBlur={() => {
                  form.setFieldTouched(name, true);
                }}
                onKeyDown={event => {
                  // Submit form on enter
                  if (event.keyCode === 13) {
                    event.preventDefault();

                    form.submitForm();
                  }
                }}
                className={inputClasses}
              />
            )}
            {multiple && (
              <input
                ref={ref}
                type="checkbox"
                id={`${identifier}-${name}-${key}`}
                name={`${name}[${key}]`}
                value={option.value}
                checked={form.values[name].indexOf(option.value) !== -1}
                onChange={event => {
                  form.setFieldError(name, null);

                  const nextValue = [...form.values[name]];

                  if (event.target.checked) {
                    nextValue.push(option.value);
                  } else {
                    nextValue.splice(nextValue.indexOf(option.value), 1);
                  }

                  form.setFieldValue(name, nextValue);
                }}
                onBlur={() => {
                  form.setFieldTouched(name, true);
                }}
                onKeyDown={event => {
                  // Submit form on enter
                  if (event.keyCode === 13) {
                    event.preventDefault();

                    form.submitForm();
                  }
                }}
                className={inputClasses}
              />
            )}
            <label
              className="custom-control-label"
              htmlFor={`${identifier}-${name}-${key}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </Field>
  );
  /* eslint-enable */
});

FormChoice.displayName = 'FormChoice';
FormChoice.propTypes = propTypes;
FormChoice.defaultProps = defaultProps;

export default FormChoice;
