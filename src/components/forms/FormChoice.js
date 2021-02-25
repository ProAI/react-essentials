import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Field from './Field';
import useIdentifier from '../../hooks/useIdentifier';
import useFormField from './useFormField';
import FieldPropTypes from './FieldPropTypes';

const propTypes = {
  ...FieldPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      // eslint-disable-next-line react/forbid-prop-types
      value: PropTypes.any,
      label: PropTypes.node,
    }),
  ).isRequired,
  multiple: PropTypes.bool,
};

const FormChoice = React.forwardRef((props, ref) => {
  const {
    name,
    title,
    options,
    info,
    multiple = false,
    disabled = false,
    onValueChange,
    formatError = (error) => error,
    ...elementProps
  } = props;

  const identifier = useIdentifier('form');
  const field = useFormField(name);

  const classes = cx(
    // constant classes
    'custom-control',
    `custom-${multiple ? 'checkbox' : 'radio'}`,
  );

  const inputClasses = cx(
    // constant classes
    'custom-control-input',
    // variable classes
    field.touched && field.error && 'is-invalid',
  );

  /* eslint-disable jsx-a11y/label-has-for */
  return (
    <Field
      error={formatError(field.error)}
      touched={field.touched}
      info={info}
      elementProps={elementProps}
    >
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
                value={option.value || ''}
                checked={field.value === option.value}
                onChange={(event) => {
                  const nextValue = event.target.checked
                    ? option.value
                    : field.value;

                  field.setValue(nextValue, onValueChange);
                }}
                onBlur={() => {
                  field.setTouched();
                }}
                onKeyDown={field.handleSubmitOnEnter}
                className={inputClasses}
                disabled={disabled}
              />
            )}
            {multiple && (
              <input
                ref={ref}
                type="checkbox"
                id={`${identifier}-${name}-${key}`}
                name={`${name}[${key}]`}
                value={option.value}
                checked={field.value.indexOf(option.value) !== -1}
                onChange={(event) => {
                  const nextValue = [...field.value];

                  if (event.target.checked) {
                    nextValue.push(option.value);
                  } else {
                    nextValue.splice(nextValue.indexOf(option.value), 1);
                  }

                  field.setValue(nextValue, onValueChange);
                }}
                onBlur={() => {
                  field.setTouched();
                }}
                onKeyDown={field.handleSubmitOnEnter}
                className={inputClasses}
                disabled={disabled}
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

export default FormChoice;
